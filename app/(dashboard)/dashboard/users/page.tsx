// app/dashboard/users/page.tsx

import { requireRole }      from "@/lib/auth/session";
import { getUserList, getPendingInvites } from "@/lib/users/queries";
import UsersTable           from "@/components/users/UsersTable";
import CreateUserModal      from "@/components/users/CreateUserModal";
import PendingInvitesTable  from "@/components/users/PendingInvitesTable";

interface Props {
  searchParams: {
    search?: string;
    role?:   string;
    page?:   string | number;
  };
}

export default async function UsersPage({ searchParams }: Props) {
  const session = await requireRole("ADMIN");
  const { page = 1, search = "", role = "ALL" } = await searchParams;

  const pageInt = Number(page);

  const [data, invites] = await Promise.all([
    getUserList({ search, role, page: pageInt }),
    getPendingInvites(),
  ]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Users</h1>
          <p className="text-sm text-gray-400 mt-1">{data.total} total users</p>
        </div>
        <CreateUserModal />
      </div>

      {/* Users table */}
      <UsersTable
        users={data.users}
        totalPages={data.totalPages}
        currentPage={data.page}
        currentSearch={search}
        currentRole={role}
        currentAdminId={session.userId}
      />

      {/* Pending invites */}
      {invites.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">
            Pending invites
            <span className="ml-2 text-sm font-normal text-amber-400">
              {invites.length} waiting
            </span>
          </h2>
          <PendingInvitesTable invites={invites} />
        </div>
      )}
    </div>
  );
}