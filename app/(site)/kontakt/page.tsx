import type { Metadata } from "next";
import { safeFetch } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import { mockSettings } from "@/lib/mockData";
import type { SiteSettings } from "@/types/sanity";
import ContactForm from "@/components/ui/ContactForm";
import PageHero    from "@/components/ui/PageHero";
import { Phone, Mail, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Nehmen Sie Kontakt auf — wir freuen uns auf Ihre Anfrage.",
};

export default async function KontaktPage() {
  const settings: SiteSettings = (await safeFetch(siteSettingsQuery)) ?? mockSettings;

  return (
    <>
      <PageHero
        headline="Kontakt"
        subline="Wir sind für Sie da. Schreiben Sie uns oder rufen Sie an."
      />
      <section className="section-padding">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Kontaktinformationen</h2>
              <div className="space-y-4">
                {settings?.phone && (
                  <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-violet-600/20 flex items-center justify-center group-hover:bg-violet-600/30 transition-colors">
                      <Phone className="w-5 h-5 text-violet-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">Telefon</p>
                      <p className="text-white group-hover:text-violet-300 transition-colors">{settings.phone}</p>
                    </div>
                  </a>
                )}
                {settings?.email && (
                  <a href={`mailto:${settings.email}`} className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-violet-600/20 flex items-center justify-center group-hover:bg-violet-600/30 transition-colors">
                      <Mail className="w-5 h-5 text-violet-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">E-Mail</p>
                      <p className="text-white group-hover:text-violet-300 transition-colors">{settings.email}</p>
                    </div>
                  </a>
                )}
                {settings?.address && (
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-violet-600/20 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-violet-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">Adresse</p>
                      <p className="text-white whitespace-pre-line">{settings.address}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="glass-card p-4 text-xs text-gray-500 leading-relaxed">
              🔒 <strong className="text-gray-400">Datenschutz:</strong> Ihre Daten werden ausschließlich
              zur Bearbeitung Ihrer Anfrage verwendet und nicht an Dritte weitergegeben.{" "}
              <a href="/datenschutz" className="text-violet-400 hover:underline">Datenschutzerklärung</a>
            </div>
          </div>
          <div className="glass-card p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Nachricht senden</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
