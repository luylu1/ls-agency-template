import { defineField, defineType } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";

export const legalPage = defineType({
  name: "legalPage",
  title: "Rechtliche Seiten",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "pageType",
      title: "Seitentyp",
      type: "string",
      options: {
        list: [
          { title: "Impressum",     value: "impressum" },
          { title: "Datenschutz",   value: "datenschutz" },
          { title: "AGB",           value: "agb" },
          { title: "Cookie-Policy", value: "cookies" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "headline", title: "Überschrift", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "content",
      title: "Inhalt (Rich Text)",
      type: "array",
      of: [{ type: "block" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "lastUpdated",
      title: "Zuletzt aktualisiert",
      type: "date",
      options: { dateFormat: "DD.MM.YYYY" },
    }),
  ],
  preview: {
    select: { title: "headline", subtitle: "pageType" },
  },
});
