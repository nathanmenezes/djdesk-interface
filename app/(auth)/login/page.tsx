import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <>
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-semibold text-zinc-900">DJDesk</h1>
        <p className="mt-1 text-sm text-zinc-500">Entre na sua conta</p>
      </div>
      <LoginForm />
      <p className="mt-4 text-center text-sm text-zinc-500">
        Não tem conta?{" "}
        <Link href="/register" className="font-medium text-zinc-900 underline">
          Cadastre-se
        </Link>
      </p>
    </>
  );
}
