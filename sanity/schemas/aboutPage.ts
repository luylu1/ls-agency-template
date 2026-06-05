import { defineField, defineType } from "sanity";
import { UsersIcon } from "@sanity/icons";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "Über uns",
  type: "document",
  icon: UsersIcon,
  fields: [
    defineField({ name: "headline",   title: "Überschrift", type: "string", validation: (r) => r.required() }),
    defineField({ name: "subline",    title: "Unterzeile",  type: "string" }),
    defineField({
      name: "content",
      title: "Inhalt",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", title: "Alt-Text", type: "string" })],
        },
      ],
    }),
    defineField({
      name: "teamMembers",
      title: "Team",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name",     title: "Name",      type: "string" }),
            defineField({ name: "role",     title: "Position",  type: "string" }),
            defineField({ name: "bio",      title: "Kurztext",  type: "text", rows: 3 }),
            defineField({ name: "photo",    title: "Foto",      type: "image", options: { hotspot: true } }),
          ],
          preview: { select: { title: "name", subtitle: "role", media: "photo" } },
        },
      ],
    }),
    defineField({
      name: "values",
      title: "Werte / Vorteile",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "icon",  title: "Icon (Emoji)", type: "string" }),
            defineField({ name: "title", title: "Titel",        type: "string" }),
            defineField({ name: "text",  title: "Text",         type: "text", rows: 2 }),
          ],
          preview: { select: { title: "title", subtitle: "text" } },
        },
      ],
    }),
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
  preview: { prepare: () => ({ title: "Über uns" }) },
});
