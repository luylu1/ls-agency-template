import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/types/sanity";
import ServiceCard from "@/components/ui/ServiceCard";

interface Props {
  headline?: string;
  subline?:  string;
  services:  Service[];
}

export default function ServicesPreview({ headline, subline, services }: Props) {
  if (!services?.length) return null;

  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {headline ?? "Unsere"} <span className="gradient-text">Leistungen</span>
          </h2>
          {subline && <p className="text-gray-400 max-w-2xl mx-auto">{subline}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {services.map((s) => (
            <ServiceCard key={s._id} service={s} />
          ))}
        </div>

        <div className="text-center">
          <Link href="/leistungen" className="btn-secondary inline-flex">
            Alle Leistungen ansehen <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
