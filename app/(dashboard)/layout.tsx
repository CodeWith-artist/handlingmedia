import { Sidebar } from "./components/sidebar/Sidebar";
import "@/app/(public)/globals.css";
import { getSession } from "@/lib/auth/session";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <html lang="en">
      <body>
        <div className="flex h-screen bg-[#080c11] overflow-hidden text-white">
          <Sidebar session={session} />
          <main className="flex-1 overflow-auto">
              {children}
          </main>
        </div>
      </body>
    </html>
  );
}