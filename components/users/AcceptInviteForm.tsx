// components/users/AcceptInviteForm.tsx
"use client";

import { useActionState } from "react";
import { acceptInviteAction } from "@/lib/users/invite";

const initial = { success: true as const };

export default function AcceptInviteForm({
  token,
  email,
}: {
  token: string;
  email: string;
}) {
    
  const boundAction = acceptInviteAction.bind(null, token);
  const [state, formAction, pending] = useActionState(boundAction, initial);

  return (
      <form action={formAction} className="space-y-5">
      {!state.success && (
        <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
          {state.error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1.5">Email</label>
        <input
          value={email}
          disabled
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-gray-500 cursor-not-allowed"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1.5">Full name</label>
        <input
          name="name"
          type="text"
          placeholder="Jane Smith"
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white
                     placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1.5">Password</label>
        <input
          name="password"
          type="password"
          placeholder="Min 8 chars, 1 uppercase, 1 number"
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white
                     placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50
                   text-white text-sm font-semibold transition-colors"
      >
        {pending ? "Setting up account…" : "Create account"}
      </button>
      </form>
  );
}