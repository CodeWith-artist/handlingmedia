// app/(auth)/login/page.tsx

import { loginAction } from "@/lib/auth/actions";
import AuthForm from "@/components/auth/AuthForm";
import { redirect } from "next/navigation";



export default async function LoginPage({ searchParams }: { searchParams: { suspended?: string } }) {
  const { suspended } = await searchParams;
  return(
  <>
    {suspended && (
          <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400 text-center">
            Your account has been suspended. Contact an administrator.
          </div>
        )}
    <AuthForm mode="login" action={loginAction } />;
  </>
  )
}