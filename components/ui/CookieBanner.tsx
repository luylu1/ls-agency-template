"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";

const STORAGE_KEY = "cookie-consent-v1";

export default function CookieBanner({ text }: { text?: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-sm z-50 animate-slide-up">
      <div className="glass-card p-5 shadow-2xl shadow-black/50">
        <div className="flex items-start gap-3 mb-4">
          <Cookie className="w-5 h-5 text-violet-400 shrink-0 mt-0.5" />
          <p className="text-sm text-gray-300 leading-relaxed">
            {text ?? "Diese Website verwendet Cookies für ein besseres Nutzungserlebnis."}
            {" "}
            <Link href="/datenschutz" className="text-violet-400 hover:underline">
              Mehr erfahren
            </Link>
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={accept}
            className="flex-1 btn-primary py-2 text-sm justify-center"
          >
            Akzeptieren
          </button>
          <button
            onClick={decline}
            className="flex-1 py-2 text-sm text-gray-400 hover:text-white border border-white/15 rounded-xl hover:bg-white/8 transition-colors"
          >
            Ablehnen
          </button>
        </div>
      </div>
    </div>
  );
}
