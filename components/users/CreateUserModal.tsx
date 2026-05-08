// components/users/CreateUserModal.tsx
"use client";

import { useState, useActionState } from "react";
import { createUserAction, createInviteAction } from "@/lib/users/actions";
import type { UserActionResult } from "@/lib/users/actions";

const initial: UserActionResult = { success: true };

export default function CreateUserModal() {
  const [open, setOpen]   = useState(false);
  const [tab, setTab]     = useState<"direct" | "invite">("direct");
  const [inviteUrl, setInviteUrl] = useState<string | null>(null);

  const [directState, directAction, directPending] =
    useActionState(async (prev: UserActionResult, fd: FormData) => {
      const res = await createUserAction(prev, fd);
      if (res.success) setOpen(false);
      return res;
    }, initial);

  const [inviteState, inviteAction, invitePending] =
    useActionState(async (prev: UserActionResult, fd: FormData) => {
      const res = await createInviteAction(prev, fd);
      if (res.success && res.message) setInviteUrl(res.message);
      return res;
    }, initial);

  const ROLES = ["USER", "MARKETING", "ADMIN"] as const;

  if (!open) {
    return (
      <button
        onClick={() => { setOpen(true); setInviteUrl(null); }}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold
                   bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
      >
        + Add user
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800">
          <h2 className="text-lg font-bold text-white">Add user</h2>
          <button
            onClick={() => setOpen(false)}
            className="text-gray-500 hover:text-white transition-colors text-xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-800">
          {([["direct", "Create directly"], ["invite", "Send invite"]] as const).map(([t, label]) => (
            <button
              key={t}
              onClick={() => { setTab(t); setInviteUrl(null); }}
              className={`flex-1 py-3 text-sm font-medium transition-colors
                ${tab === t
                  ? "text-white border-b-2 border-indigo-500"
                  : "text-gray-500 hover:text-gray-300"
                }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* ── Direct create ─────────────────────────── */}
          {tab === "direct" && (
            <form action={directAction} className="space-y-4">
              {!directState.success && !directState.fields && (
                <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                  {directState.error}
                </p>
              )}

              {(["name", "email", "password"] as const).map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5 capitalize">
                    {field}
                  </label>
                  <input
                    name={field}
                    type={field === "password" ? "password" : field === "email" ? "email" : "text"}
                    placeholder={
                      field === "name"     ? "Jane Smith" :
                      field === "email"    ? "jane@example.com" :
                      "Min 8 chars, 1 uppercase, 1 number"
                    }
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white
                               placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  {!directState.success && directState.fields?.[field] && (
                    <p className="mt-1 text-xs text-red-400">{directState.fields[field]![0]}</p>
                  )}
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Role</label>
                <select
                  name="role"
                  defaultValue="USER"
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white
                             focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {ROLES.map((r) => (
                    <option key={r} value={r}>{r.charAt(0) + r.slice(1).toLowerCase()}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={directPending}
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50
                           text-white text-sm font-semibold transition-colors mt-2"
              >
                {directPending ? "Creating…" : "Create user"}
              </button>
            </form>
          )}

          {/* ── Invite link ───────────────────────────── */}
          {tab === "invite" && (
            <>
              {inviteUrl ? (
                <div className="space-y-4">
                  <p className="text-sm text-green-400 bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-3">
                    Invite created! Share this link with the user:
                  </p>
                  <div className="flex gap-2">
                    <input
                      readOnly
                      value={inviteUrl}
                      className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-3 py-2.5 text-xs text-gray-300
                                 focus:outline-none select-all"
                    />
                    <button
                      onClick={() => navigator.clipboard.writeText(inviteUrl)}
                      className="px-4 py-2.5 bg-gray-800 hover:bg-gray-700 border border-gray-700
                                 text-gray-300 text-xs rounded-xl transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                  <p className="text-xs text-gray-600">Link expires in 72 hours.</p>
                  <button
                    onClick={() => setInviteUrl(null)}
                    className="w-full py-2.5 rounded-xl border border-gray-700 text-gray-400
                               hover:text-white text-sm transition-colors"
                  >
                    Send another invite
                  </button>
                </div>
              ) : (
                <form action={inviteAction} className="space-y-4">
                  {!inviteState.success && (
                    <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                      {inviteState.error}
                    </p>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1.5">Email</label>
                    <input
                      name="email"
                      type="email"
                      placeholder="jane@example.com"
                      className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white
                                 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1.5">Role</label>
                    <select
                      name="role"
                      defaultValue="USER"
                      className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white
                                 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {ROLES.map((r) => (
                        <option key={r} value={r}>{r.charAt(0) + r.slice(1).toLowerCase()}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={invitePending}
                    className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50
                               text-white text-sm font-semibold transition-colors mt-2"
                  >
                    {invitePending ? "Generating…" : "Generate invite link"}
                  </button>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}