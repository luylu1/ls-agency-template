import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { safeFetch } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import { mockSettings } from "@/lib/mockData";
import type { SiteSettings } from "@/types/sanity";
import CookieBanner from "@/components/ui/CookieBanner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export async function generateMetadata(): Promise<Metadata> {
  const settings: SiteSettings = (await safeFetch(siteSettingsQuery)) ?? mockSettings;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: settings?.seo?.metaTitle ?? settings?.siteName ?? "Website",
      template: `%s | ${settings?.siteName ?? "Website"}`,
    },
    description: settings?.seo?.metaDescription ?? settings?.tagline ?? "",
    openGraph: {
      type: "website",
      siteName: settings?.siteName,
      images: settings?.seo?.ogImage?.asset?.url
        ? [{ url: settings.seo.ogImage.asset.url }]
        : [],
    },
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings: SiteSettings = (await safeFetch(siteSettingsQuery)) ?? mockSettings;

  return (
    <html lang="de" className={inter.variable}>
      <body>
        {settings?.gtmId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${settings.gtmId}');`,
            }}
          />
        )}
        {children}
        <CookieBanner text={settings?.cookieBannerText} />
      </body>
    </html>
  );
}
