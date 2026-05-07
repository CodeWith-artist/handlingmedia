// app/(auth)/login/page.tsx

import { loginAction } from "@/lib/auth/actions";
import AuthForm from "@/components/auth/AuthForm";



export default function LoginPage() {
  return <AuthForm mode="login" action={loginAction } />;
}