import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Props {
  headline?: string;
  text?:     string;
}

export default function CtaBanner({ headline, text }: Props) {
  return (
    <section className="section-padding">
      <div className="max-w-4xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-brand p-10 sm:p-14 text-center">
          {/* Glow */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-violet-400/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl" />

          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {headline ?? "Bereit für Ihre neue Website?"}
            </h2>
            {text && <p className="text-violet-200 mb-8 max-w-xl mx-auto">{text}</p>}
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-violet-700 font-bold rounded-xl hover:bg-violet-50 transition-colors shadow-xl"
            >
              Jetzt kostenlos anfragen <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
