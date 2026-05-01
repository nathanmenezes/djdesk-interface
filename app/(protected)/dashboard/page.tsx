import { logoutAction } from "@/actions/auth.actions";

export default function DashboardPage() {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center gap-6"
      style={{ background: "#000" }}
    >
      <span
        className="font-sans text-3xl font-black tracking-[0.2em] uppercase"
        style={{ color: "oklch(0.88 0.05 18)" }}
      >
        DJ<span style={{ color: "oklch(0.52 0.18 25)" }}>Desk</span>
      </span>
      <p
        className="text-sm uppercase tracking-widest"
        style={{ color: "oklch(0.48 0.1 25)" }}
      >
        Dashboard
      </p>
      <form action={logoutAction}>
        <button type="submit" className="auth-btn" style={{ width: "auto", padding: "0.65rem 2rem" }}>
          Sair
        </button>
      </form>
    </div>
  );
}
