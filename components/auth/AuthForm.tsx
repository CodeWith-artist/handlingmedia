// components/auth/AuthForm.tsx

"use client";

import { useActionState } from "react";
import Link from "next/link";
import type { AuthResult } from "@/lib/auth/actions";

interface Props {
  mode: "login" | "register";
  action: (prevState: AuthResult, formData: FormData) => Promise<AuthResult>;
}

const initialState: AuthResult = { success: true };

export default function AuthForm({ mode, action }: Props) {
  const [state, formAction, pending] = useActionState(action, initialState);
  const isLogin = mode === "login";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            {isLogin ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            {isLogin ? "Sign in to continue" : "Get started for free"}
          </p>
        </div>

        {/* Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl">
          {/* Global error */}
          {!state.success && !state.fields && (
            <div className="mb-5 rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
              {state.error}
            </div>
          )}

          <form action={formAction} className="space-y-5">
            {/* Name — register only */}
            {!isLogin && (
              <Field
                id="name"
                label="Full name"
                type="text"
                placeholder="Jane Smith"
                autoComplete="name"
                errors={!state.success ? state.fields?.name : undefined}
              />
            )}

            <Field
              id="email"
              label="Email address"
              type="email"
              placeholder="jane@example.com"
              autoComplete={isLogin ? "email" : "username"}
              errors={!state.success ? state.fields?.email : undefined}
            />

            <Field
              id="password"
              label="Password"
              type="password"
              placeholder={isLogin ? "••••••••" : "Min 8 chars, 1 uppercase, 1 number"}
              autoComplete={isLogin ? "current-password" : "new-password"}
              errors={!state.success ? state.fields?.password : undefined}
            />

            <button
              type="submit"
              disabled={pending}
              className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed
                         text-white font-semibold py-3 text-sm transition-colors duration-150"
            >
              {pending ? "Please wait…" : isLogin ? "Sign in" : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <Link
              href={isLogin ? "/register" : "/login"}
              className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Reusable field ─────────────────────────────────────────────
function Field({
  id,
  label,
  type,
  placeholder,
  autoComplete,
  errors,
}: {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  autoComplete?: string;
  errors?: string[];
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1.5">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`w-full rounded-lg bg-gray-800 border px-4 py-2.5 text-sm text-white placeholder:text-gray-500
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 transition
                    ${errors?.length ? "border-red-500/60" : "border-gray-700"}`}
      />
      {errors?.map((e) => (
        <p key={e} className="mt-1 text-xs text-red-400">{e}</p>
      ))}
    </div>
  );
}