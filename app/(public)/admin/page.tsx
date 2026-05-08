// app/admin/page.tsx — Admin-only RSC
import { requireRole } from "@/lib/auth/session";

export default async function AdminPage() {
  const session = await requireRole("ADMIN"); // redirects to /unauthorized if not admin

  return <div>Admin panel for {session.email}</div>;
}