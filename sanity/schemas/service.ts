import { defineField, defineType } from "sanity";
import { SparklesIcon } from "@sanity/icons";

export const service = defineType({
  name: "service",
  title: "Leistungen",
  type: "document",
  icon: SparklesIcon,
  fields: [
    defineField({
      name: "title",
      title: "Name der Leistung",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "URL-Slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon (Emoji)",
      type: "string",
      description: "z.B. 🌐 💻 📱",
    }),
    defineField({
      name: "shortDescription",
      title: "Kurzbeschreibung (für Karten)",
      type: "text",
      rows: 3,
      validation: (r) => r.required().max(200),
    }),
    defineField({
      name: "description",
      title: "Ausführliche Beschreibung",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "features",
      title: "Leistungsumfang (Bullet Points)",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "price",
      title: "Preis / Preisangabe",
      type: "string",
      description: "z.B. 'Ab 990 €' oder 'Auf Anfrage'",
    }),
    defineField({
      name: "image",
      title: "Bild",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "order",
      title: "Reihenfolge",
      type: "number",
      initialValue: 1,
    }),
    defineField({
      name: "highlighted",
      title: "Hervorgehoben (z.B. beliebteste Leistung)",
      type: "boolean",
      initialValue: false,
    }),
  ],
  orderings: [
    { title: "Reihenfolge", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "price", media: "image" },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: subtitle ?? "Kein Preis", media };
    },
  },
});
