"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import type { SiteSettings } from "@/types/sanity";

const navLinks = [
  { href: "/",           label: "Start" },
  { href: "/leistungen", label: "Leistungen" },
  { href: "/ueber-uns",  label: "Über uns" },
  { href: "/kontakt",    label: "Kontakt" },
];

export default function Header({ settings }: { settings: SiteSettings }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo / Firmenname */}
        <Link href="/" className="flex items-center gap-3 shrink-0" onClick={() => setOpen(false)}>
          {settings?.logo?.asset?.url ? (
            <Image
              src={settings.logo.asset.url}
              alt={settings.siteName ?? "Logo"}
              width={120}
              height={40}
              className="h-9 w-auto object-contain"
            />
          ) : (
            <span className="font-bold text-lg gradient-text">
              {settings?.siteName ?? "Firmenname"}
            </span>
          )}
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm text-gray-300 hover:text-white rounded-lg hover:bg-white/8 transition-all"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/kontakt" className="btn-primary ml-4 py-2 text-sm">
            Anfrage stellen
          </Link>
        </nav>

        {/* Mobile Burger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Menü öffnen"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-[#0a0a0f]/95 backdrop-blur-lg px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/8 rounded-xl transition-all"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2">
            <Link href="/kontakt" onClick={() => setOpen(false)} className="btn-primary w-full justify-center">
              Anfrage stellen
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
