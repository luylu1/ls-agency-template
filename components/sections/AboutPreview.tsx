import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { HomePage } from "@/types/sanity";
import PortableTextRenderer from "@/components/ui/PortableTextRenderer";

export default function AboutPreview({ data }: { data: HomePage }) {
  if (!data?.aboutText && !data?.aboutImage) return null;

  return (
    <section className="section-padding bg-white/3">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            {data?.aboutHeadline ?? "Über"} <span className="gradient-text">uns</span>
          </h2>
          {data?.aboutText && (
            <div className="prose-dark mb-8">
              <PortableTextRenderer value={data.aboutText} />
            </div>
          )}
          <Link href="/ueber-uns" className="btn-secondary inline-flex">
            Mehr erfahren <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {data?.aboutImage?.asset?.url && (
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            <Image
              src={data.aboutImage.asset.url}
              alt="Über uns"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-violet-900/30 to-transparent" />
          </div>
        )}
      </div>
    </section>
  );
}
