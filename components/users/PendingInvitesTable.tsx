// components/users/PendingInvitesTable.tsx
"use client";

import { useTransition } from "react";
import { revokeInviteAction } from "@/lib/users/actions";
import { Role } from "@/generated/prisma/client";

const ROLE_STYLES: Record<Role, string> = {
  ADMIN:     "bg-purple-500/20 text-purple-400",
  MARKETING: "bg-blue-500/20 text-blue-400",
  USER:      "bg-gray-700 text-gray-400",
};

type Invite = {
  id:        string;
  email:     string;
  role:      Role;
  expiresAt: Date;
  createdBy: { name: string | null; email: string };
};

export default function PendingInvitesTable({ invites }: { invites: Invite[] }) {
  const [isPending, startTransition] = useTransition();

  function handleRevoke(id: string) {
    startTransition(async () => {
      await revokeInviteAction(id);
    });
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-800 text-gray-500 text-xs uppercase tracking-wider">
            <th className="text-left px-6 py-4">Email</th>
            <th className="text-left px-4 py-4">Role</th>
            <th className="text-left px-4 py-4 hidden md:table-cell">Invited by</th>
            <th className="text-left px-4 py-4 hidden lg:table-cell">Expires</th>
            <th className="px-6 py-4"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {invites.map((invite) => (
            <tr key={invite.id} className="hover:bg-gray-800/50 transition-colors">
              <td className="px-6 py-4 text-white font-medium">{invite.email}</td>
              <td className="px-4 py-4">
                <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${ROLE_STYLES[invite.role]}`}>
                  {invite.role.charAt(0) + invite.role.slice(1).toLowerCase()}
                </span>
              </td>
              <td className="px-4 py-4 hidden md:table-cell text-gray-400 text-xs">
                {invite.createdBy.name ?? invite.createdBy.email}
              </td>
              <td className="px-4 py-4 hidden lg:table-cell text-gray-500 text-xs">
                {new Date(invite.expiresAt).toLocaleDateString("en-IN", {
                  day: "numeric", month: "short", year: "numeric",
                })}
              </td>
              <td className="px-6 py-4 text-right">
                <button
                  disabled={isPending}
                  onClick={() => handleRevoke(invite.id)}
                  className="text-xs px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400
                             hover:bg-red-500/20 transition-colors disabled:opacity-40"
                >
                  Revoke
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}