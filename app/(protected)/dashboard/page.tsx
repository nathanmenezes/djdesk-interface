import { logoutAction } from "@/actions/auth.actions";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-semibold text-zinc-900">Dashboard</h1>
      <form action={logoutAction}>
        <button
          type="submit"
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white"
        >
          Sair
        </button>
      </form>
    </div>
  );
}
