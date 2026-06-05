export interface SanityImage {
  asset?: { url: string };
  alt?: string;
}

export interface SiteSettings {
  siteName?: string;
  tagline?:  string;
  logo?:     SanityImage;
  phone?:    string;
  email?:    string;
  address?:  string;
  socialLinks?: {
    instagram?: string;
    facebook?:  string;
    linkedin?:  string;
    tiktok?:    string;
  };
  seo?: {
    metaTitle?:       string;
    metaDescription?: string;
    ogImage?:         SanityImage;
  };
  gtmId?:            string;
  cookieBannerText?: string;
}

export interface UspItem {
  icon:  string;
  label: string;
}

export interface HomePage {
  heroHeadline?:      string;
  heroSubline?:       string;
  heroCtaLabel?:      string;
  heroCtaLink?:       string;
  heroImage?:         SanityImage;
  uspItems?:          UspItem[];
  servicesHeadline?:  string;
  servicesSubline?:   string;
  aboutHeadline?:     string;
  aboutText?:         import("@portabletext/types").PortableTextBlock[];
  aboutImage?:        SanityImage;
  ctaBannerHeadline?: string;
  ctaBannerText?:     string;
  seo?: { metaTitle?: string; metaDescription?: string };
}

export interface Service {
  _id:              string;
  title:            string;
  slug:             { current: string };
  icon?:            string;
  shortDescription: string;
  description?:     import("@portabletext/types").PortableTextBlock[];
  features?:        string[];
  price?:           string;
  highlighted?:     boolean;
  image?:           SanityImage;
}

export interface TeamMember {
  name:  string;
  role:  string;
  bio?:  string;
  photo?: SanityImage;
}

export interface ValueItem {
  icon?:  string;
  title:  string;
  text?:  string;
}

export interface AboutPage {
  headline?:     string;
  subline?:      string;
  content?:      import("@portabletext/types").PortableTextBlock[];
  teamMembers?:  TeamMember[];
  values?:       ValueItem[];
  seo?: { metaTitle?: string; metaDescription?: string };
}
