import type { Service } from "@/types/sanity";
import { CheckCircle2 } from "lucide-react";

interface Props {
  service:     Service;
  showDetails?: boolean;
}

export default function ServiceCard({ service, showDetails }: Props) {
  return (
    <div
      className={`glass-card p-6 flex flex-col transition-all duration-200 hover:-translate-y-1 hover:border-violet-500/30 ${
        service.highlighted ? "ring-1 ring-violet-500/50 border-violet-500/30" : ""
      }`}
    >
      {service.highlighted && (
        <div className="inline-block self-start px-3 py-1 rounded-full bg-violet-600/20 border border-violet-500/30 text-violet-300 text-xs font-medium mb-4">
          Beliebt
        </div>
      )}

      {service.icon && (
        <span className="text-4xl mb-4">{service.icon}</span>
      )}

      <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>

      <p className="text-gray-400 text-sm flex-1 mb-4">{service.shortDescription}</p>

      {showDetails && service.features && service.features.length > 0 && (
        <ul className="space-y-1.5 mb-4">
          {service.features.map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
              <CheckCircle2 className="w-4 h-4 text-violet-400 mt-0.5 shrink-0" />
              {f}
            </li>
          ))}
        </ul>
      )}

      {service.price && (
        <div className="pt-4 mt-auto border-t border-white/10">
          <span className="text-violet-400 font-semibold">{service.price}</span>
        </div>
      )}
    </div>
  );
}
