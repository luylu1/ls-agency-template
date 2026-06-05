interface Props {
  headline: string;
  subline?: string;
}

export default function PageHero({ headline, subline }: Props) {
  return (
    <section className="relative pt-32 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.15)_0%,transparent_60%)]" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">{headline}</h1>
        {subline && <p className="text-gray-400 text-lg max-w-2xl mx-auto">{subline}</p>}
      </div>
    </section>
  );
}
