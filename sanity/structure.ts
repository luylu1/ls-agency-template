import type { StructureResolver } from "sanity/structure";

// Definiert die Sidebar-Struktur im Sanity Studio
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Website-Verwaltung")
    .items([
      S.listItem()
        .title("⚙️ Einstellungen")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),

      S.divider(),

      S.listItem()
        .title("🏠 Startseite")
        .id("homePage")
        .child(S.document().schemaType("homePage").documentId("homePage")),

      S.documentTypeListItem("service")
        .title("✨ Leistungen"),

      S.listItem()
        .title("👥 Über uns")
        .id("aboutPage")
        .child(S.document().schemaType("aboutPage").documentId("aboutPage")),

      S.divider(),

      S.documentTypeListItem("legalPage")
        .title("⚖️ Rechtliche Seiten"),
    ]);
