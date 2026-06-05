# LS Agency Template — Setup für neues Kundenprojekt

## 1. Repo klonen & umbenennen
```bash
cp -r ls-agency-template kunde-mustermann
cd kunde-mustermann
npm install
```

## 2. Sanity Projekt erstellen
1. sanity.io → "New Project" → Name = Kundenname
2. Dataset: `production`
3. API → Tokens → "Add API token" → Editor-Rechte → Key kopieren

## 3. .env.local anlegen
```bash
cp .env.example .env.local
```
Dann ausfüllen:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xyz
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=sk...
SANITY_WEBHOOK_SECRET=irgendeinzufaelligerstring
RESEND_API_KEY=re_...
CONTACT_EMAIL_TO=kontakt@kunde.de
CONTACT_EMAIL_FROM=noreply@kunde.de
NEXT_PUBLIC_SITE_URL=https://www.kunde.de
```

## 4. Sanity Schema deployen
```bash
npm run dev
# Studio unter http://localhost:3000/studio
# Dort Inhalte anlegen: Einstellungen, Startseite, Leistungen, etc.
```

## 5. Sanity Webhook einrichten (für Revalidierung)
sanity.io → Projekt → API → Webhooks:
- URL: `https://www.kunde.de/api/revalidate?secret=DEIN_WEBHOOK_SECRET`
- Trigger: On create, On update, On delete
- Dataset: production

## 6. Resend einrichten
resend.com → Kostenloses Konto → Domain verifizieren → API Key

## 7. Vercel Deploy
```bash
git init && git add . && git commit -m "feat: initial project setup"
# Vercel → Import → alle .env.local Variablen als Environment Variables eintragen
vercel --prod
```

## 8. Pro-Kunde anpassen (Checkliste)
- [ ] `CLAUDE.md` / Firmenname in `sanity.config.ts` (title)
- [ ] Navigationslinks in `components/layout/Header.tsx` (falls neue Seiten)
- [ ] Farben in `tailwind.config.ts` (brand.* Farben)
- [ ] Sanity Studio Inhalt befüllen
- [ ] Impressum & Datenschutz hinterlegen
- [ ] Domain in Vercel eintragen
- [ ] GTM-ID in Sanity Einstellungen eintragen

## Projektstruktur
```
app/
  (site)/          → Alle öffentlichen Seiten (mit Header/Footer)
  studio/          → Sanity CMS (nur für Kunden)
  api/
    contact/       → Kontaktformular → Resend
    revalidate/    → Sanity Webhook → ISR
  sitemap.ts       → Automatisch generiert
  robots.ts        → SEO
components/
  layout/          → Header, Footer
  sections/        → Hero, Services, About, CtaBanner, UspStripe
  ui/              → ServiceCard, ContactForm, CookieBanner, PageHero, PortableText
sanity/
  schemas/         → Alle CMS-Felder (Kunde pflegt diese)
  lib/             → Client + GROQ Queries
  structure.ts     → Studio Sidebar-Struktur
types/sanity.ts    → TypeScript Typen
```
