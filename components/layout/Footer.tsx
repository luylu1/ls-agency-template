import Link from "next/link";
import type { SiteSettings } from "@/types/sanity";
import { Instagram, Facebook, Linkedin } from "lucide-react";

export default function Footer({ settings }: { settings: SiteSettings }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#070709]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Marke */}
          <div className="lg:col-span-2">
            <p className="font-bold text-lg gradient-text mb-2">
              {settings?.siteName ?? "Firmenname"}
            </p>
            {settings?.tagline && (
              <p className="text-gray-400 text-sm mb-4">{settings.tagline}</p>
            )}
            {/* Social */}
            <div className="flex items-center gap-3">
              {settings?.socialLinks?.instagram && (
                <a href={settings.socialLinks.instagram} target="_blank" rel="noopener noreferrer"
                   className="w-9 h-9 rounded-lg bg-white/8 hover:bg-violet-600/30 flex items-center justify-center transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {settings?.socialLinks?.facebook && (
                <a href={settings.socialLinks.facebook} target="_blank" rel="noopener noreferrer"
                   className="w-9 h-9 rounded-lg bg-white/8 hover:bg-violet-600/30 flex items-center justify-center transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {settings?.socialLinks?.linkedin && (
                <a href={settings.socialLinks.linkedin} target="_blank" rel="noopener noreferrer"
                   className="w-9 h-9 rounded-lg bg-white/8 hover:bg-violet-600/30 flex items-center justify-center transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">Navigation</p>
            <ul className="space-y-2 text-sm text-gray-400">
              {[
                { href: "/",           label: "Startseite" },
                { href: "/leistungen", label: "Leistungen" },
                { href: "/ueber-uns",  label: "Über uns" },
                { href: "/kontakt",    label: "Kontakt" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">Kontakt</p>
            <ul className="space-y-2 text-sm text-gray-400">
              {settings?.phone && (
                <li>
                  <a href={`tel:${settings.phone.replace(/\s/g,"")}`} className="hover:text-white transition-colors">
                    {settings.phone}
                  </a>
                </li>
              )}
              {settings?.email && (
                <li>
                  <a href={`mailto:${settings.email}`} className="hover:text-white transition-colors">
                    {settings.email}
                  </a>
                </li>
              )}
              {settings?.address && (
                <li className="whitespace-pre-line">{settings.address}</li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          <p>© {year} {settings?.siteName ?? "Firmenname"}. Alle Rechte vorbehalten.</p>
          <div className="flex items-center gap-4">
            <Link href="/impressum"   className="hover:text-gray-400 transition-colors">Impressum</Link>
            <Link href="/datenschutz" className="hover:text-gray-400 transition-colors">Datenschutz</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
