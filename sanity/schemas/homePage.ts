import { defineField, defineType } from "sanity";
import { HomeIcon } from "@sanity/icons";

export const homePage = defineType({
  name: "homePage",
  title: "Startseite",
  type: "document",
  icon: HomeIcon,
  fields: [
    // Hero
    defineField({
      name: "heroHeadline",
      title: "Hero: Überschrift",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "heroSubline",
      title: "Hero: Unterzeile",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "heroCtaLabel",
      title: "Hero: Button Text",
      type: "string",
      initialValue: "Jetzt anfragen",
    }),
    defineField({
      name: "heroCtaLink",
      title: "Hero: Button Link",
      type: "string",
      initialValue: "/kontakt",
    }),
    defineField({
      name: "heroImage",
      title: "Hero: Hintergrundbild (optional)",
      type: "image",
      options: { hotspot: true },
    }),
    // USP-Streifen
    defineField({
      name: "uspItems",
      title: "USP-Punkte (3-4 Stück)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "icon",  title: "Icon (Emoji oder Text)", type: "string" }),
            defineField({ name: "label", title: "Text",                   type: "string" }),
          ],
          preview: { select: { title: "label", subtitle: "icon" } },
        },
      ],
    }),
    // Leistungen-Vorschau
    defineField({
      name: "servicesHeadline",
      title: "Leistungen: Überschrift",
      type: "string",
      initialValue: "Unsere Leistungen",
    }),
    defineField({
      name: "servicesSubline",
      title: "Leistungen: Unterzeile",
      type: "string",
    }),
    // Über uns Vorschau
    defineField({
      name: "aboutHeadline",
      title: "Über uns: Überschrift",
      type: "string",
      initialValue: "Wer sind wir?",
    }),
    defineField({
      name: "aboutText",
      title: "Über uns: Text",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "aboutImage",
      title: "Über uns: Bild",
      type: "image",
      options: { hotspot: true },
    }),
    // CTA Banner
    defineField({
      name: "ctaBannerHeadline",
      title: "CTA-Banner: Überschrift",
      type: "string",
      initialValue: "Bereit für Ihre neue Website?",
    }),
    defineField({
      name: "ctaBannerText",
      title: "CTA-Banner: Text",
      type: "string",
    }),
    // SEO
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        defineField({ name: "metaTitle",       title: "Meta-Titel",       type: "string" }),
        defineField({ name: "metaDescription", title: "Meta-Beschreibung", type: "text", rows: 3 }),
      ],
    }),
  ],
  preview: {
    select: { title: "heroHeadline" },
    prepare: () => ({ title: "Startseite" }),
  },
});
