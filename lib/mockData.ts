import type { SiteSettings, HomePage, Service, AboutPage } from "@/types/sanity";

export const mockSettings: SiteSettings = {
  siteName: "Muster GmbH",
  tagline: "Ihr Partner für digitalen Erfolg",
  phone: "+49 123 456 789",
  email: "kontakt@muster-gmbh.de",
  address: "Musterstraße 1\n12345 Musterstadt",
  socialLinks: { instagram: "#", facebook: "#", linkedin: "#" },
  seo: {
    metaTitle: "Muster GmbH — Digitalagentur",
    metaDescription: "Professionelle Websites, SEO und Marketing für Ihr Unternehmen.",
  },
  cookieBannerText: "Diese Website verwendet Cookies für ein besseres Nutzungserlebnis.",
};

export const mockHome: HomePage = {
  heroHeadline: "Websites die\nKunden überzeugen",
  heroSubline: "Wir bauen schnelle, moderne Websites für Unternehmen die online wachsen wollen — mit Ergebnissen die messbar sind.",
  heroCtaLabel: "Jetzt kostenlos anfragen",
  heroCtaLink: "/kontakt",
  uspItems: [
    { icon: "⚡", label: "Lieferung in 14 Tagen" },
    { icon: "📱", label: "Mobile-First Design" },
    { icon: "🔍", label: "SEO-optimiert" },
    { icon: "🛡️", label: "DSGVO-konform" },
  ],
  servicesHeadline: "Was wir für Sie tun",
  servicesSubline: "Von der ersten Idee bis zum fertigen Ergebnis — alles aus einer Hand.",
  aboutHeadline: "Wer steckt dahinter?",
  ctaBannerHeadline: "Bereit für Ihre neue Website?",
  ctaBannerText: "Kostenlose Beratung — kein Risiko, kein Kleingedrucktes.",
};

export const mockServices: Service[] = [
  {
    _id: "1",
    title: "Website-Erstellung",
    slug: { current: "website-erstellung" },
    icon: "🌐",
    shortDescription: "Professionelle, schnelle Websites die bei Google gefunden werden und Besucher in Kunden verwandeln.",
    features: ["Mobile-First Design", "SEO-Grundoptimierung", "Kontaktformular", "DSGVO-konform"],
    price: "Ab 990 €",
    highlighted: true,
  },
  {
    _id: "2",
    title: "SEO & Google",
    slug: { current: "seo" },
    icon: "🔍",
    shortDescription: "Mehr Sichtbarkeit bei Google — damit potenzielle Kunden Sie finden, bevor sie zur Konkurrenz gehen.",
    features: ["Keyword-Analyse", "On-Page Optimierung", "Google Business Setup", "Monatliches Reporting"],
    price: "Ab 299 € / Monat",
  },
  {
    _id: "3",
    title: "Social Media",
    slug: { current: "social-media" },
    icon: "📱",
    shortDescription: "Reichweite aufbauen, Vertrauen schaffen und neue Kunden gewinnen — auf Instagram, Facebook & Co.",
    features: ["Content-Planung", "Posting-Service", "Story-Vorlagen", "Werbeanzeigen"],
    price: "Ab 199 € / Monat",
  },
  {
    _id: "4",
    title: "Google Ads",
    slug: { current: "google-ads" },
    icon: "📣",
    shortDescription: "Sofortige Sichtbarkeit durch bezahlte Suchanzeigen — Sie zahlen nur wenn jemand klickt.",
    features: ["Kampagnen-Setup", "Anzeigen-Texte", "Conversion-Tracking", "Wöchentliche Optimierung"],
    price: "Ab 149 € + Werbebudget",
  },
  {
    _id: "5",
    title: "Logo & Branding",
    slug: { current: "branding" },
    icon: "🎨",
    shortDescription: "Ein starkes Erscheinungsbild das Vertrauen schafft und Ihr Unternehmen unverwechselbar macht.",
    features: ["Logo-Design", "Farbpalette & Fonts", "Visitenkarten", "Briefpapier"],
    price: "Ab 490 €",
  },
  {
    _id: "6",
    title: "Wartung & Pflege",
    slug: { current: "wartung" },
    icon: "🔧",
    shortDescription: "Damit Ihre Website immer schnell, sicher und aktuell bleibt — ohne dass Sie sich darum kümmern müssen.",
    features: ["Updates & Backups", "Security-Monitoring", "Inhaltspflege", "Technischer Support"],
    price: "Ab 79 € / Monat",
  },
];

export const mockAbout: AboutPage = {
  headline: "Über uns",
  subline: "Wir sind eine Digitalagentur mit Leidenschaft für Ergebnisse.",
  values: [
    { icon: "🎯", title: "Ergebnisorientiert", text: "Wir messen unseren Erfolg an Ihrem Erfolg — nicht an Awards." },
    { icon: "⚡", title: "Schnell & zuverlässig", text: "Deadlines sind für uns keine Vorschläge." },
    { icon: "🤝", title: "Ehrliche Kommunikation", text: "Keine Buzzwords, keine leeren Versprechen." },
  ],
};
