// app/dashboard/page.tsx — Protected RSC
import { requireSession } from "@/lib/auth/session";

export default async function DashboardPage() {
  const session = await requireSession(); // redirects to /login if not authed

  return (
    <div>
      <h1>Hello, {session.email}</h1>
      <p>Role: {session.role}</p>
    </div>
  );
}