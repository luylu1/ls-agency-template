import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { safeFetch } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import { mockSettings } from "@/lib/mockData";
import type { SiteSettings } from "@/types/sanity";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings: SiteSettings = (await safeFetch(siteSettingsQuery)) ?? mockSettings;

  return (
    <>
      <Header settings={settings} />
      <main>{children}</main>
      <Footer settings={settings} />
    </>
  );
}
