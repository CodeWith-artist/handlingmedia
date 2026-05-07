// app/(auth)/register/page.tsx

import { registerAction } from "@/lib/auth/actions";
import AuthForm from "@/components/auth/AuthForm";

export default function RegisterPage() {
  return <AuthForm mode="register" action={registerAction} />;
}