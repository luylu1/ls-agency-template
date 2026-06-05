"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

const schema = z.object({
  name:    z.string().min(2, "Mindestens 2 Zeichen"),
  email:   z.string().email("Ungültige E-Mail-Adresse"),
  phone:   z.string().optional(),
  subject: z.string().min(3, "Mindestens 3 Zeichen"),
  message: z.string().min(10, "Mindestens 10 Zeichen"),
  website: z.string().optional(), // honeypot
});

type FormData = z.infer<typeof schema>;

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Fehler beim Senden");
      }
      setStatus("success");
      reset();
    } catch (e) {
      setStatus("error");
      setErrorMsg(e instanceof Error ? e.message : "Unbekannter Fehler");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
        <CheckCircle2 className="w-12 h-12 text-green-400" />
        <h3 className="text-xl font-semibold text-white">Nachricht gesendet!</h3>
        <p className="text-gray-400">Wir melden uns so schnell wie möglich bei Ihnen.</p>
        <button onClick={() => setStatus("idle")} className="btn-secondary mt-2">
          Neue Nachricht senden
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {/* Honeypot — für Bots unsichtbar */}
      <input {...register("website")} type="text" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Name *" error={errors.name?.message}>
          <input {...register("name")} placeholder="Max Mustermann" className={inputCls(!!errors.name)} />
        </Field>
        <Field label="E-Mail *" error={errors.email?.message}>
          <input {...register("email")} type="email" placeholder="name@beispiel.de" className={inputCls(!!errors.email)} />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Telefon (optional)" error={errors.phone?.message}>
          <input {...register("phone")} type="tel" placeholder="+49 123 456789" className={inputCls(!!errors.phone)} />
        </Field>
        <Field label="Betreff *" error={errors.subject?.message}>
          <input {...register("subject")} placeholder="Neue Website" className={inputCls(!!errors.subject)} />
        </Field>
      </div>

      <Field label="Nachricht *" error={errors.message?.message}>
        <textarea
          {...register("message")}
          rows={5}
          placeholder="Beschreiben Sie Ihr Projekt..."
          className={inputCls(!!errors.message) + " resize-none"}
        />
      </Field>

      {/* DSGVO Checkbox */}
      <label className="flex items-start gap-3 cursor-pointer group">
        <input
          type="checkbox"
          required
          className="mt-1 accent-violet-500 w-4 h-4 shrink-0"
        />
        <span className="text-xs text-gray-400 leading-relaxed">
          Ich stimme der Verarbeitung meiner Daten zur Bearbeitung meiner Anfrage gemäß der{" "}
          <a href="/datenschutz" className="text-violet-400 hover:underline">Datenschutzerklärung</a> zu. *
        </span>
      </label>

      {status === "error" && (
        <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {errorMsg || "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut."}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Wird gesendet…</>
        ) : (
          <><Send className="w-4 h-4" /> Nachricht senden</>
        )}
      </button>
    </form>
  );
}

function inputCls(hasError: boolean) {
  return `w-full bg-white/8 border ${
    hasError ? "border-red-500/50" : "border-white/15"
  } rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500 transition-colors text-sm`;
}

function Field({
  label, error, children,
}: {
  label: string; error?: string; children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-gray-300">{label}</label>
      {children}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
