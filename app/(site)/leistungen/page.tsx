import type { Metadata } from "next";
import { safeFetch } from "@/sanity/lib/client";
import { servicesQuery } from "@/sanity/lib/queries";
import { mockServices } from "@/lib/mockData";
import type { Service } from "@/types/sanity";
import ServiceCard from "@/components/ui/ServiceCard";
import CtaBanner   from "@/components/sections/CtaBanner";
import PageHero    from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Leistungen",
  description: "Alle unsere Leistungen auf einen Blick.",
};

export default async function LeistungenPage() {
  const services: Service[] = (await safeFetch(servicesQuery)) ?? mockServices;

  return (
    <>
      <PageHero
        headline="Unsere Leistungen"
        subline="Alles, was Ihr Unternehmen für den digitalen Erfolg braucht."
      />
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service._id} service={service} showDetails />
            ))}
          </div>
        </div>
      </section>
      <CtaBanner headline="Interesse geweckt?" text="Lassen Sie uns über Ihr Projekt sprechen." />
    </>
  );
}
