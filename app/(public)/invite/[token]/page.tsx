// app/invite/[token]/page.tsx
import { prisma }       from "@/lib/prisma";
import { notFound }     from "next/navigation";
import AcceptInviteForm from "@/components/users/AcceptInviteForm";

export default async function InvitePage({ params }: { params: { token: string } }) {
    const {token} = await params;
  const invite = await prisma.inviteToken.findUnique({
    where: { token: token },
  });

  if (!invite || invite.usedAt || invite.expiresAt < new Date()) {
    notFound();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl">
        <h1 className="text-2xl font-bold text-white mb-1">You're invited</h1>
        <p className="text-sm text-gray-400 mb-8">
          Complete your account setup for{" "}
          <span className="text-white">{invite.email}</span>
        </p>
        <AcceptInviteForm token={token} email={invite.email} />
      </div>
    </div>
  );
}