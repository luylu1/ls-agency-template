import type { Metadata } from "next";
import { safeFetch } from "@/sanity/lib/client";
import { homePageQuery, servicesQuery } from "@/sanity/lib/queries";
import { mockHome, mockServices } from "@/lib/mockData";
import type { HomePage, Service } from "@/types/sanity";
import HeroSection     from "@/components/sections/HeroSection";
import UspStripe       from "@/components/sections/UspStripe";
import ServicesPreview from "@/components/sections/ServicesPreview";
import AboutPreview    from "@/components/sections/AboutPreview";
import CtaBanner       from "@/components/sections/CtaBanner";

export async function generateMetadata(): Promise<Metadata> {
  const data: HomePage = (await safeFetch(homePageQuery)) ?? mockHome;
  return {
    title:       data?.seo?.metaTitle ?? "Startseite",
    description: data?.seo?.metaDescription ?? "",
  };
}

export default async function HomePage() {
  const [home, services]: [HomePage, Service[]] = await Promise.all([
    safeFetch<HomePage>(homePageQuery).then((d) => d ?? mockHome),
    safeFetch<Service[]>(servicesQuery).then((d) => d ?? mockServices),
  ]);

  return (
    <>
      <HeroSection data={home} />
      {(home?.uspItems?.length ?? 0) > 0 && <UspStripe items={home.uspItems!} />}
      <ServicesPreview
        headline={home?.servicesHeadline}
        subline={home?.servicesSubline}
        services={services.slice(0, 6)}
      />
      <AboutPreview data={home} />
      <CtaBanner
        headline={home?.ctaBannerHeadline}
        text={home?.ctaBannerText}
      />
    </>
  );
}
