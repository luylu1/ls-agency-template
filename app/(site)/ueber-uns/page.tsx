import type { Metadata } from "next";
import Image from "next/image";
import { safeFetch } from "@/sanity/lib/client";
import { aboutPageQuery } from "@/sanity/lib/queries";
import { mockAbout } from "@/lib/mockData";
import type { AboutPage } from "@/types/sanity";
import PortableTextRenderer from "@/components/ui/PortableTextRenderer";
import PageHero  from "@/components/ui/PageHero";
import CtaBanner from "@/components/sections/CtaBanner";

export async function generateMetadata(): Promise<Metadata> {
  const data: AboutPage = (await safeFetch(aboutPageQuery)) ?? mockAbout;
  return {
    title:       data?.seo?.metaTitle ?? "Über uns",
    description: data?.seo?.metaDescription ?? "",
  };
}

export default async function UeberUnsPage() {
  const data: AboutPage = (await safeFetch(aboutPageQuery)) ?? mockAbout;

  return (
    <>
      <PageHero headline={data?.headline ?? "Über uns"} subline={data?.subline} />

      {data?.content && (
        <section className="section-padding">
          <div className="container-narrow">
            <div className="prose-dark">
              <PortableTextRenderer value={data.content} />
            </div>
          </div>
        </section>
      )}

      {(data?.values?.length ?? 0) > 0 && (
        <section className="section-padding bg-white/3">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Unsere <span className="gradient-text">Werte</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data!.values!.map((v, i) => (
                <div key={i} className="glass-card p-6">
                  {v.icon && <span className="text-4xl mb-4 block">{v.icon}</span>}
                  <h3 className="text-xl font-semibold mb-2 text-white">{v.title}</h3>
                  <p className="text-gray-400">{v.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {(data?.teamMembers?.length ?? 0) > 0 && (
        <section className="section-padding">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Unser <span className="gradient-text">Team</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {data!.teamMembers!.map((member, i) => (
                <div key={i} className="glass-card p-6 text-center">
                  {member.photo?.asset?.url && (
                    <Image
                      src={member.photo.asset.url}
                      alt={member.name}
                      width={120}
                      height={120}
                      className="rounded-full mx-auto mb-4 object-cover w-[120px] h-[120px]"
                    />
                  )}
                  <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                  <p className="text-violet-400 text-sm mb-3">{member.role}</p>
                  <p className="text-gray-400 text-sm">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBanner headline="Lassen Sie uns zusammenarbeiten." />
    </>
  );
}
