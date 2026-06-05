#!/usr/bin/env node
/**
 * LS Webagentur — Neues Kundenprojekt setup
 * Usage: npm run new-client -- "Muster GmbH" muster-gmbh
 *
 * Was dieses Script macht:
 * 1. Kopiert die Vorlage in einen neuen Ordner
 * 2. Erstellt ein Sanity-Projekt + Dataset + API-Token
 * 3. Erstellt ein Vercel-Projekt und verknüpft GitHub-Repo
 * 4. Schreibt alle ENV-Variablen automatisch
 * 5. Pusht zu GitHub und deployed auf Vercel
 */

import { execSync, exec } from "child_process";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { randomBytes } from "crypto";
import { promisify } from "util";
import * as readline from "readline";

const execAsync = promisify(exec);
const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

// ─── Hilfsfunktionen ───────────────────────────────────────────────────────

function log(msg)   { console.log(`\x1b[36m▶\x1b[0m ${msg}`); }
function ok(msg)    { console.log(`\x1b[32m✓\x1b[0m ${msg}`); }
function warn(msg)  { console.log(`\x1b[33m⚠\x1b[0m ${msg}`); }
function err(msg)   { console.log(`\x1b[31m✗\x1b[0m ${msg}`); process.exit(1); }

function run(cmd, cwd = ROOT) {
  return execSync(cmd, { cwd, encoding: "utf8", stdio: "pipe" }).trim();
}

async function ask(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(question, (answer) => { rl.close(); resolve(answer.trim()); });
  });
}

function getSanityToken() {
  const paths = [
    join(process.env.HOME || "", ".config/sanity/config.json"),
    join(process.env.APPDATA || "", "sanity/config.json"),
  ];
  for (const p of paths) {
    if (existsSync(p)) {
      return JSON.parse(readFileSync(p, "utf8")).authToken;
    }
  }
  return null;
}

async function sanityApi(method, path, body = null, token) {
  const res = await fetch(`https://api.sanity.io/v2021-06-07${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  return res.json();
}

// ─── Main ──────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
if (args.length === 0) {
  console.log(`
\x1b[1mLS Webagentur — Neues Kundenprojekt\x1b[0m

Usage: npm run new-client -- "<Kundenname>" [<slug>]

Beispiel:
  npm run new-client -- "Müller GmbH" mueller-gmbh
  npm run new-client -- "Hotel Bergblick"
`);
  process.exit(0);
}

const clientName = args[0];
const clientSlug = (args[1] || clientName.toLowerCase()
  .replace(/[äöüß]/g, c => ({ ä:"ae",ö:"oe",ü:"ue",ß:"ss" })[c])
  .replace(/[^a-z0-9]/g, "-")
  .replace(/-+/g, "-")
  .replace(/^-|-$/g, "")
).slice(0, 30);

const projectDir = join(ROOT, "..", clientSlug);

console.log(`
\x1b[1m╔══════════════════════════════════════════╗
║   LS Webagentur — Neues Kundenprojekt    ║
╚══════════════════════════════════════════╝\x1b[0m

Kunde:   \x1b[1m${clientName}\x1b[0m
Slug:    \x1b[1m${clientSlug}\x1b[0m
Ordner:  \x1b[1m${projectDir}\x1b[0m
`);

// ── Step 1: Sanity Auth Check ──────────────────────────────────────────────
log("Sanity-Login prüfen...");
let sanityToken = getSanityToken();
if (!sanityToken) {
  warn("Nicht bei Sanity eingeloggt. Login wird gestartet...");
  run(`npx sanity@latest login --provider github`);
  sanityToken = getSanityToken();
  if (!sanityToken) err("Sanity-Login fehlgeschlagen.");
}
const me = await sanityApi("GET", "/users/me", null, sanityToken);
if (!me.id) err("Sanity-Token ungültig. Bitte erneut einloggen: npx sanity@latest login");
ok(`Sanity: eingeloggt als ${me.name} (${me.email})`);

// ── Step 2: Ordner kopieren ────────────────────────────────────────────────
log("Projektordner erstellen...");
if (existsSync(projectDir)) {
  const overwrite = await ask(`\x1b[33m⚠ Ordner '${clientSlug}' existiert bereits. Überschreiben? (j/N): \x1b[0m`);
  if (overwrite.toLowerCase() !== "j") err("Abgebrochen.");
}
run(`cp -r "${ROOT}" "${projectDir}"`);
// .git und .next entfernen
run(`rm -rf .git .next node_modules/.cache`, projectDir);
ok(`Projektordner erstellt: ${projectDir}`);

// ── Step 3: Sanity-Projekt erstellen ──────────────────────────────────────
log(`Sanity-Projekt '${clientName}' erstellen...`);
const project = await sanityApi("POST", "/projects", { displayName: clientName }, sanityToken);
if (!project.id) err(`Sanity-Projekt-Erstellung fehlgeschlagen: ${JSON.stringify(project)}`);
const projectId = project.id;
ok(`Sanity-Projekt erstellt (ID: ${projectId})`);

log("Dataset 'production' erstellen...");
await sanityApi("PUT", `/projects/${projectId}/datasets/production`, { aclMode: "public" }, sanityToken);
ok("Dataset 'production' erstellt");

log("API-Token erstellen...");
const tokenRes = await sanityApi("POST", `/projects/${projectId}/tokens`, {
  label: `${clientName} - Next.js`,
  roleName: "editor",
}, sanityToken);
const apiToken = tokenRes.key;
if (!apiToken) err("API-Token-Erstellung fehlgeschlagen");
ok("API-Token erstellt");

// ── Step 4: Webhook Secret generieren ─────────────────────────────────────
const webhookSecret = randomBytes(32).toString("hex");

// ── Step 5: .env.local schreiben ──────────────────────────────────────────
log(".env.local schreiben...");
const siteUrl = `https://${clientSlug}.vercel.app`;
const envContent = `NEXT_PUBLIC_SANITY_PROJECT_ID=${projectId}
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=${apiToken}
SANITY_WEBHOOK_SECRET=${webhookSecret}

# E-Mail (Resend) — hier echten Key eintragen
RESEND_API_KEY=re_placeholder
CONTACT_EMAIL_TO=kontakt@${clientSlug}.de
CONTACT_EMAIL_FROM=noreply@${clientSlug}.de

NEXT_PUBLIC_SITE_URL=${siteUrl}
`;
writeFileSync(join(projectDir, ".env.local"), envContent);
ok(".env.local geschrieben");

// ── Step 6: package.json Projektname anpassen ─────────────────────────────
const pkgPath = join(projectDir, "package.json");
const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
pkg.name = clientSlug;
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
ok("package.json aktualisiert");

// ── Step 7: GitHub Repo erstellen und pushen ──────────────────────────────
log("GitHub-Repo erstellen...");
try {
  const repoResult = JSON.parse(
    run(`gh repo create ${clientSlug} --private --json url,sshUrl,htmlUrl 2>&1`, projectDir)
  );
  ok(`GitHub-Repo erstellt: ${repoResult.htmlUrl}`);

  run(`git init && git add . && git commit -m "feat: initial setup for ${clientName}"`, projectDir);
  run(`git remote add origin ${repoResult.sshUrl}`, projectDir);
  run(`git push -u origin main`, projectDir);
  ok("Code zu GitHub gepusht");
} catch (e) {
  warn(`GitHub-Repo konnte nicht automatisch erstellt werden (gh CLI Auth?).`);
  warn("Manuell: cd " + projectDir + " && git init && git push zu neuem Repo");
}

// ── Step 8: Vercel deployen ────────────────────────────────────────────────
log("Vercel-Projekt erstellen und deployen...");
try {
  // Alle ENV-Vars zu Vercel hinzufügen
  const envVars = [
    ["NEXT_PUBLIC_SANITY_PROJECT_ID", projectId],
    ["NEXT_PUBLIC_SANITY_DATASET", "production"],
    ["SANITY_API_TOKEN", apiToken],
    ["SANITY_WEBHOOK_SECRET", webhookSecret],
    ["NEXT_PUBLIC_SITE_URL", siteUrl],
    ["RESEND_API_KEY", "re_placeholder"],
    ["CONTACT_EMAIL_TO", `kontakt@${clientSlug}.de`],
    ["CONTACT_EMAIL_FROM", `noreply@${clientSlug}.de`],
  ];

  run(`npx vercel link --yes --project ${clientSlug}`, projectDir);

  for (const [key, value] of envVars) {
    try {
      run(`npx vercel env add ${key} production <<< "${value}" --yes`, projectDir);
    } catch {}
  }

  const deployOutput = run(`npx vercel --prod --yes`, projectDir);
  const deployUrl = deployOutput.split("\n").find(l => l.startsWith("https://")) || siteUrl;
  ok(`Vercel deployed: ${deployUrl}`);
} catch (e) {
  warn("Vercel-Deployment fehlgeschlagen. Manuell ausführen:");
  warn(`  cd ${projectDir} && npx vercel --prod`);
}

// ── Zusammenfassung ────────────────────────────────────────────────────────
console.log(`
\x1b[1m\x1b[32m╔══════════════════════════════════════════╗
║         ✓ Setup abgeschlossen!           ║
╚══════════════════════════════════════════╝\x1b[0m

\x1b[1mKunde:\x1b[0m         ${clientName}
\x1b[1mSanity-Projekt:\x1b[0m ${projectId}
\x1b[1mLokaler Ordner:\x1b[0m ${projectDir}
\x1b[1mWebsite:\x1b[0m       ${siteUrl}
\x1b[1mStudio:\x1b[0m        ${siteUrl}/studio

\x1b[1mNächste Schritte:\x1b[0m
  1. Resend API-Key in Vercel ENV eintragen (RESEND_API_KEY)
  2. Kunde zu Sanity einladen:
     npx sanity@latest users invite --role editor ${projectId}
  3. Domain in Vercel eintragen
  4. Sanity-Webhook anlegen:
     URL: ${siteUrl}/api/revalidate?secret=${webhookSecret.slice(0,8)}...
`);
