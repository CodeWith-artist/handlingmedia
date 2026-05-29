// components/contact/ContactForm.tsx
"use client";

import { useActionState, useState } from "react";
import { submitContactForm, type FormState } from "@/lib/contact/actions";
import { SERVICES } from "./Service-config";

const initial: FormState = { status: "idle" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactForm, initial);
  const [focused, setFocused] = useState<string | null>(null);

  if (state.status === "success") {
    return <SuccessCard />;
  }

  // ── helpers ─────────────────────────────────────────────────

  const fieldErr = (name: string): string | undefined =>
    state.status === "error" ? state.fields?.[name]?.[0] : undefined;

  const fieldClass = (name: string) => `
    w-full rounded-xl px-4 py-3 text-sm text-white/80
    bg-white/[0.04] border transition-all duration-200 outline-none
    placeholder:text-white/20
    ${fieldErr(name)
      ? "border-red-500/50 bg-red-500/[0.03]"
      : focused === name
        ? "border-orange-500/60 bg-orange-500/[0.03] shadow-[0_0_0_3px_rgba(249,115,22,0.08)]"
        : "border-white/[0.08] hover:border-white/15"
    }`;

  const selectClass = (name: string) => `
    w-full rounded-xl px-4 py-3 text-sm
    bg-white/[0.04] border transition-all duration-200 outline-none
    appearance-none cursor-pointer
    ${fieldErr(name)
      ? "border-red-500/50 text-white/80"
      : focused === name
        ? "border-orange-500/60 bg-orange-500/[0.03] shadow-[0_0_0_3px_rgba(249,115,22,0.08)] text-white/80"
        : "border-white/[0.08] hover:border-white/15 text-white/50"
    }`;

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden">
      {/* Top accent bar */}
      <div className="h-[3px] bg-gradient-to-r from-transparent via-orange-500 to-transparent" />

      <div className="p-8">
        <h2
          className="font-black text-white mb-1 text-2xl"
          
        >
          Tell us about your project
        </h2>
        <p className="text-white/35 text-sm mb-8">
          Takes 2 minutes — we'll handle the rest.
        </p>

        {/* Global error */}
        {state.status === "error" && !state.fields && (
          <div className="mb-6 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
            {state.message}
          </div>
        )}

        <form action={formAction} className="space-y-5">

          {/* Name + Company */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Your name *" error={fieldErr("name")}>
              <input
                name="name"
                required
                placeholder="Rahul Sharma"
                className={fieldClass("name")}
                onFocus={() => setFocused("name")}
                onBlur={() => setFocused(null)}
              />
            </Field>
            <Field label="Company / Brand" error={fieldErr("company")}>
              <input
                name="company"
                placeholder="Acme Pvt. Ltd."
                className={fieldClass("company")}
                onFocus={() => setFocused("company")}
                onBlur={() => setFocused(null)}
              />
            </Field>
          </div>

          {/* Email + Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Work email *" error={fieldErr("email")}>
              <input
                name="email"
                type="email"
                required
                placeholder="rahul@company.com"
                className={fieldClass("email")}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused(null)}
              />
            </Field>
            <Field label="WhatsApp / Phone *" error={fieldErr("phone")}>
              <input
                name="phone"
                type="tel"
                required
                placeholder="+91 98765 43210"
                className={fieldClass("phone")}
                onFocus={() => setFocused("phone")}
                onBlur={() => setFocused(null)}
              />
            </Field>
          </div>

          {/* Service */}
          <Field label="Service you're interested in *" error={fieldErr("service")}>
            <div className="relative">
              <select
                name="service"
                required
                className={selectClass("service")}
                onFocus={() => setFocused("service")}
                onBlur={() => setFocused(null)}
              >
                {SERVICES.map((s) => (
                  <option key={s.value} value={s.value}
                    style={{ background: "#18181b", color: "rgba(255,255,255,0.7)" }}>
                    {s.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/30 text-xs">
                ▾
              </div>
            </div>
          </Field>

          {/* Website */}
          <Field label="Current website (if any)" error={fieldErr("website")}>
            <input
              name="website"
              type="url"
              placeholder="https://yourwebsite.com"
              className={fieldClass("website")}
              onFocus={() => setFocused("website")}
              onBlur={() => setFocused(null)}
            />
          </Field>

          {/* Message */}
          <Field label="Tell us about your project *" error={fieldErr("message")}>
            <textarea
              name="message"
              required
              rows={4}
              placeholder="We're a D2C brand selling health supplements. We want to automate our WhatsApp follow-ups and build a new Shopify store…"
              className={`${fieldClass("message")} resize-none leading-relaxed`}
              onFocus={() => setFocused("message")}
              onBlur={() => setFocused(null)}
            />
          </Field>

          {/* Source */}
          <Field label="How did you hear about us?">
            <div className="flex flex-wrap gap-2">
              {["Google", "WhatsApp", "Instagram", "Referral", "LinkedIn", "Other"].map((src) => (
                <label
                  key={src}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg cursor-pointer
                    border border-white/[0.07] bg-white/[0.02]
                    hover:border-orange-500/30 hover:bg-orange-500/[0.04]
                    transition-all duration-150 group"
                >
                  <input
                    type="radio"
                    name="source"
                    value={src.toLowerCase()}
                    className="w-3 h-3 accent-orange-500"
                  />
                  <span className="text-xs text-white/45 group-hover:text-white/70 transition-colors">
                    {src}
                  </span>
                </label>
              ))}
            </div>
          </Field>

          {/* Submit */}
          <button
            type="submit"
            disabled={pending}
            className="group relative w-full overflow-hidden rounded-xl py-4 font-black text-white
              bg-orange-500 hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed
              hover:-translate-y-0.5 transition-all duration-200
              shadow-[0_6px_28px_rgba(249,115,22,0.3)]"
            style={{ letterSpacing: "0.08em", fontSize: "16px" }}
          >
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full
              transition-transform duration-700 ease-in-out
              bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            <span className="relative flex items-center justify-center gap-2">
              {pending ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving your brief…
                </>
              ) : (
                <>
                  SEND MY PROJECT BRIEF
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </>
              )}
            </span>
          </button>

          <p className="text-xs text-center text-white/18 leading-relaxed">
            By submitting, you agree to our{" "}
            <a href="/privacy" className="underline hover:text-white/40 transition-colors">
              Privacy Policy
            </a>
            . We never share your data.
          </p>
        </form>
      </div>
    </div>
  );
}

// ── Field wrapper ─────────────────────────────────────────────

function Field({
  label,
  error,
  children,
}: {
  label:    string;
  error?:   string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-white/40 mb-1.5 tracking-wide">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  );
}

// ── Success card ──────────────────────────────────────────────

function SuccessCard() {
  return (
    <div className="rounded-2xl border border-green-500/25 bg-green-500/[0.04] overflow-hidden">
      <div className="h-[3px] bg-gradient-to-r from-transparent via-green-500 to-transparent" />
      <div className="p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30
          flex items-center justify-center mx-auto mb-6 text-3xl
          animate-bounce [animation-duration:2s]">
          ✅
        </div>
        <h3
          className="font-black text-white text-3xl mb-3"
          
        >
          We got your brief!
        </h3>
        <p className="text-white/40 text-sm leading-relaxed max-w-sm mx-auto mb-8">
          Our team will review your project and reach out within{" "}
          <strong className="text-white/70">4 hours</strong> on your WhatsApp or email.
        </p>
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full
          bg-green-500/10 border border-green-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-green-400 font-semibold">
            Response time: under 4 hours
          </span>
        </div>
      </div>
    </div>
  );
}