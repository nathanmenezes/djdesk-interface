import Link from "next/link";
import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <>
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-semibold text-zinc-900">DJDesk</h1>
        <p className="mt-1 text-sm text-zinc-500">Crie sua conta</p>
      </div>
      <RegisterForm />
      <p className="mt-4 text-center text-sm text-zinc-500">
        Já tem conta?{" "}
        <Link href="/login" className="font-medium text-zinc-900 underline">
          Entrar
        </Link>
      </p>
    </>
  );
}
