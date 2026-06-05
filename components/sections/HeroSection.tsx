import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { HomePage } from "@/types/sanity";

export default function HeroSection({ data }: { data: HomePage }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-brand-subtle" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.25)_0%,transparent_60%)]" />
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-300 text-sm mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          Jetzt verfügbar
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1]">
          {data?.heroHeadline
            ? data.heroHeadline
            : <><span className="gradient-text">Professionelle</span><br />Websites & Marketing</>
          }
        </h1>

        {data?.heroSubline && (
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            {data.heroSubline}
          </p>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={data?.heroCtaLink ?? "/kontakt"}
            className="btn-primary text-base px-8 py-4"
          >
            {data?.heroCtaLabel ?? "Jetzt anfragen"}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/leistungen" className="btn-secondary text-base px-8 py-4">
            Leistungen ansehen
          </Link>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
    </section>
  );
}
