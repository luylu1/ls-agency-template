import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { url: siteUrl,                       lastModified: new Date(), changeFrequency: "monthly" as const, priority: 1.0 },
    { url: `${siteUrl}/leistungen`,        lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${siteUrl}/ueber-uns`,         lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${siteUrl}/kontakt`,           lastModified: new Date(), changeFrequency: "yearly"  as const, priority: 0.7 },
    { url: `${siteUrl}/impressum`,         lastModified: new Date(), changeFrequency: "yearly"  as const, priority: 0.1 },
    { url: `${siteUrl}/datenschutz`,       lastModified: new Date(), changeFrequency: "yearly"  as const, priority: 0.1 },
  ];

  return staticRoutes;
}
