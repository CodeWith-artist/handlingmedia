// app/unauthorized/page.tsx

import Link from "next/link";
import { ShieldOff } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-10 text-center shadow-2xl">

          {/* Icon */}
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 mx-auto mb-6">
            <ShieldOff className="w-7 h-7 text-red-400" />
          </div>

          {/* Status code */}
          <p className="text-xs font-semibold tracking-widest uppercase text-red-400 mb-2">
            403 — Forbidden
          </p>

          {/* Heading */}
          <h1 className="text-2xl font-bold text-white mb-3">
            Access denied
          </h1>

          {/* Description */}
          <p className="text-sm text-gray-400 leading-relaxed mb-8">
            You don't have permission to view this page. This area is
            restricted to authorized roles only.
          </p>

          {/* Actions */}
          <div className="flex items-center justify-center gap-3">
            <Link
              href="javascript:history.back()"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium
                         text-gray-300 bg-gray-800 hover:bg-gray-700 border border-gray-700
                         transition-colors duration-150"
            >
              ← Go back
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium
                         text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20
                         transition-colors duration-150"
            >
              Dashboard
            </Link>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-800 mt-8 pt-6">
            <p className="text-xs text-gray-600 leading-relaxed">
              If you believe this is a mistake, contact your{" "}
              <span className="text-gray-500 underline cursor-pointer">
                system administrator
              </span>{" "}
              or request elevated access from your team lead.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}