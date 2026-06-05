import { groq } from "next-sanity";

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteName, tagline, phone, email, address,
    logo { asset->{ url } },
    socialLinks,
    seo { metaTitle, metaDescription, ogImage { asset->{ url } } },
    gtmId, cookieBannerText
  }
`;

export const homePageQuery = groq`
  *[_type == "homePage"][0] {
    heroHeadline, heroSubline, heroCtaLabel, heroCtaLink,
    heroImage { asset->{ url }, alt },
    uspItems,
    servicesHeadline, servicesSubline,
    aboutHeadline, aboutText, aboutImage { asset->{ url }, alt },
    ctaBannerHeadline, ctaBannerText,
    seo
  }
`;

export const servicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    _id, title, slug, icon, shortDescription,
    description, features, price, highlighted,
    image { asset->{ url }, alt }
  }
`;

export const aboutPageQuery = groq`
  *[_type == "aboutPage"][0] {
    headline, subline, content,
    teamMembers[] { name, role, bio, photo { asset->{ url }, alt } },
    values,
    seo
  }
`;

export const legalPageQuery = groq`
  *[_type == "legalPage" && pageType == $pageType][0] {
    headline, content, lastUpdated
  }
`;
