// components/users/UsersTable.tsx
"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTransition, useState }    from "react";
import { Role }  from "@/generated/prisma/client";
import {
  updateUserRoleAction,
  toggleSuspendAction,
  deleteUserAction,
} from "@/lib/users/actions";

type User = {
  id:           string;
  name:         string | null;
  email:        string;
  role:         Role;
  suspended:    boolean;
  emailVerified:boolean;
  createdAt:    Date;
};

const ROLE_STYLES: Record<Role, string> = {
  ADMIN:     "bg-purple-500/20 text-purple-400",
  MARKETING: "bg-blue-500/20 text-blue-400",
  USER:      "bg-gray-700 text-gray-400",
};

interface Props {
  users:          User[];
  totalPages:     number;
  currentPage:    number;
  currentSearch:  string;
  currentRole:    string;
  currentAdminId: string;
}

export default function UsersTable({
  users, totalPages, currentPage,
  currentSearch, currentRole, currentAdminId,
}: Props) {
  const router        = useRouter();
  const pathname      = usePathname();
  const searchParams  = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState(currentSearch);

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    if (key !== "page") params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    updateParam("search", search);
  }

  function handleRoleChange(userId: string, role: Role) {
    startTransition(async () => {
      await updateUserRoleAction(userId, role);
    });
  }

  function handleSuspend(userId: string, suspend: boolean) {
    startTransition(async () => {
      await toggleSuspendAction(userId, suspend);
    });
  }

  function handleDelete(userId: string, email: string) {
    if (!confirm(`Permanently delete ${email}? This cannot be undone.`)) return;
    startTransition(async () => {
      await deleteUserAction(userId);
    });
  }

  return (
    <div className="space-y-4">
      {/* Search + filter bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <form onSubmit={handleSearch} className="flex gap-2 flex-1">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email…"
            className="flex-1 bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white
                       placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm
                       font-medium rounded-xl transition-colors"
          >
            Search
          </button>
        </form>

        {/* Role filter */}
        <select
          value={currentRole}
          onChange={(e) => updateParam("role", e.target.value)}
          className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="ALL">All roles</option>
          <option value="USER">User</option>
          <option value="MARKETING">Marketing</option>
          <option value="ADMIN">Admin</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        {users.length === 0 ? (
          <div className="py-16 text-center text-gray-500 text-sm">No users found.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800 text-gray-500 text-xs uppercase tracking-wider">
                <th className="text-left px-6 py-4">User</th>
                <th className="text-left px-4 py-4">Role</th>
                <th className="text-left px-4 py-4 hidden md:table-cell">Status</th>
                <th className="text-left px-4 py-4 hidden lg:table-cell">Joined</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {users.map((user) => {
                const isSelf = user.id === currentAdminId;
                return (
                  <tr key={user.id} className="hover:bg-gray-800/50 transition-colors">
                    {/* User info */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/30
                                        flex items-center justify-center text-indigo-400 text-xs font-bold flex-shrink-0">
                          {(user.name ?? user.email).charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-white">
                            {user.name ?? "—"}
                            {isSelf && (
                              <span className="ml-2 text-xs text-gray-600">(you)</span>
                            )}
                          </p>
                          <p className="text-gray-500 text-xs">{user.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Role selector */}
                    <td className="px-4 py-4">
                      <select
                        value={user.role}
                        disabled={isSelf || isPending}
                        onChange={(e) => handleRoleChange(user.id, e.target.value as Role)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium border-0
                                    focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer
                                    disabled:cursor-not-allowed disabled:opacity-50
                                    ${ROLE_STYLES[user.role]}`}
                      >
                        <option value="USER">User</option>
                        <option value="MARKETING">Marketing</option>
                        <option value="ADMIN">Admin</option>
                      </select>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4 hidden md:table-cell">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium
                        ${user.suspended
                          ? "bg-red-500/10 text-red-400"
                          : "bg-green-500/10 text-green-400"
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${user.suspended ? "bg-red-400" : "bg-green-400"}`} />
                        {user.suspended ? "Suspended" : "Active"}
                      </span>
                    </td>

                    {/* Joined */}
                    <td className="px-4 py-4 hidden lg:table-cell text-gray-500 text-xs">
                      {new Date(user.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric", month: "short", year: "numeric",
                      })}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 justify-end">
                        {!isSelf && (
                          <>
                            <button
                              disabled={isPending}
                              onClick={() => handleSuspend(user.id, !user.suspended)}
                              className={`text-xs px-3 py-1.5 rounded-lg transition-colors disabled:opacity-40
                                ${user.suspended
                                  ? "bg-green-500/10 text-green-400 hover:bg-green-500/20"
                                  : "bg-amber-500/10 text-amber-400 hover:bg-amber-500/20"
                                }`}
                            >
                              {user.suspended ? "Unsuspend" : "Suspend"}
                            </button>

                            <button
                              disabled={isPending}
                              onClick={() => handleDelete(user.id, user.email)}
                              className="text-xs px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400
                                         hover:bg-red-500/20 transition-colors disabled:opacity-40"
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <p className="text-sm text-gray-500">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              disabled={currentPage <= 1}
              onClick={() => updateParam("page", String(currentPage - 1))}
              className="px-4 py-2 text-sm rounded-lg bg-gray-900 border border-gray-800 text-gray-400
                         hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              ← Prev
            </button>
            <button
              disabled={currentPage >= totalPages}
              onClick={() => updateParam("page", String(currentPage + 1))}
              className="px-4 py-2 text-sm rounded-lg bg-gray-900 border border-gray-800 text-gray-400
                         hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}