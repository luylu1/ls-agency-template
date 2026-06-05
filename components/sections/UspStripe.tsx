import type { UspItem } from "@/types/sanity";

export default function UspStripe({ items }: { items: UspItem[] }) {
  return (
    <section className="border-y border-white/8 bg-white/3 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-2.5 text-sm text-gray-300">
              {item.icon && <span className="text-xl">{item.icon}</span>}
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
