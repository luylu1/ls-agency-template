import { defineField, defineType } from "sanity";
import { CogIcon } from "@sanity/icons";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Website-Einstellungen",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "siteName",
      title: "Firmenname",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tagline",
      title: "Slogan / Kurzbeschreibung",
      type: "string",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "phone",
      title: "Telefonnummer",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "E-Mail (öffentlich)",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Adresse",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "socialLinks",
      title: "Social Media Links",
      type: "object",
      fields: [
        defineField({ name: "instagram", title: "Instagram URL", type: "url" }),
        defineField({ name: "facebook",  title: "Facebook URL",  type: "url" }),
        defineField({ name: "linkedin",  title: "LinkedIn URL",  type: "url" }),
        defineField({ name: "tiktok",    title: "TikTok URL",    type: "url" }),
      ],
    }),
    defineField({
      name: "seo",
      title: "Standard SEO",
      type: "object",
      fields: [
        defineField({ name: "metaTitle",       title: "Meta-Titel",       type: "string" }),
        defineField({ name: "metaDescription", title: "Meta-Beschreibung (max. 160 Zeichen)", type: "text", rows: 3 }),
        defineField({ name: "ogImage",         title: "Open Graph Bild",  type: "image" }),
      ],
    }),
    defineField({
      name: "gtmId",
      title: "Google Tag Manager ID (z.B. GTM-XXXXXX)",
      type: "string",
    }),
    defineField({
      name: "cookieBannerText",
      title: "Cookie-Banner Text",
      type: "text",
      rows: 3,
      initialValue: "Diese Website verwendet Cookies, um Ihnen die bestmögliche Erfahrung zu bieten.",
    }),
  ],
  preview: {
    select: { title: "siteName", subtitle: "tagline" },
  },
});
