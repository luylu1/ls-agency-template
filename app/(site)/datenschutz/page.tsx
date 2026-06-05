import type { Metadata } from "next";
import { safeFetch } from "@/sanity/lib/client";
import { legalPageQuery } from "@/sanity/lib/queries";
import PortableTextRenderer from "@/components/ui/PortableTextRenderer";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  robots: { index: false, follow: false },
};

export default async function DatenschutzPage() {
  const data = await safeFetch<{ headline?: string; content?: never[]; lastUpdated?: string }>(
    legalPageQuery,
    { pageType: "datenschutz" }
  );

  return (
    <>
      <PageHero headline={data?.headline ?? "Datenschutzerklärung"} />
      <section className="section-padding">
        <div className="container-narrow">
          {data?.lastUpdated && (
            <p className="text-sm text-gray-500 mb-8">
              Zuletzt aktualisiert: {new Date(data.lastUpdated).toLocaleDateString("de-DE")}
            </p>
          )}
          <div className="prose-dark">
            {data?.content
              ? <PortableTextRenderer value={data.content} />
              : (
                <div className="glass-card p-6 text-gray-400 text-sm space-y-2">
                  <p className="font-semibold text-white">Datenschutzerklärung noch nicht hinterlegt</p>
                  <p>Bitte im CMS unter <strong>Rechtliche Seiten → Datenschutz</strong> anlegen.</p>
                  <p className="text-xs text-gray-500 mt-4">Tipp: datenschutz-generator.de für DSGVO-konforme Texte.</p>
                </div>
              )
            }
          </div>
        </div>
      </section>
    </>
  );
}
