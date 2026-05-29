// app/(dashboard)/layout.tsx

import { Sidebar } from "./components/sidebar/Sidebar";
import { getSession } from "@/lib/auth/session";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <div className="flex h-screen bg-[#080c11] overflow-hidden text-white">
      <Sidebar session={session} />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}