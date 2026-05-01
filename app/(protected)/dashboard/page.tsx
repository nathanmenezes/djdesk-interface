import Link from "next/link";
import { eventService } from "@/services/event.service";
import { EventCard } from "@/components/dashboard/event-card";
import { logoutAction } from "@/actions/auth.actions";

export default async function DashboardPage() {
  let events = await eventService.list().catch(() => []);

  return (
    <div className="min-h-screen px-6 pt-12 bg-background">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between mb-10">
          <span
            className="font-sans text-2xl font-black tracking-[0.2em] uppercase"
            style={{ color: "oklch(0.88 0.05 18)" }}
          >
            DJ<span style={{ color: "oklch(0.52 0.18 25)" }}>Desk</span>
          </span>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/new"
              className="auth-btn text-sm"
              style={{ padding: "0.55rem 1.5rem", width: "auto" }}
            >
              + Novo evento
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className="text-xs uppercase tracking-widest"
                style={{ color: "oklch(0.45 0.08 25)" }}
              >
                Sair
              </button>
            </form>
          </div>
        </div>

        <h2
          className="text-xs uppercase tracking-[0.2em] mb-6"
          style={{ color: "oklch(0.45 0.08 25)" }}
        >
          Meus eventos
        </h2>

        {events.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center gap-4 rounded-lg py-20"
            style={{
              border: "1px dashed oklch(0.22 0.08 25 / 0.5)",
              background: "oklch(0.05 0.01 25 / 0.3)",
            }}
          >
            <svg
              viewBox="0 0 48 48"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="w-10 h-10"
              style={{ color: "oklch(0.35 0.1 25)" }}
            >
              <circle cx="24" cy="24" r="18" />
              <circle cx="24" cy="24" r="6" />
              <path d="M24 6v4M24 38v4M6 24h4M38 24h4" />
            </svg>
            <p
              className="text-sm uppercase tracking-widest"
              style={{ color: "oklch(0.45 0.08 25)" }}
            >
              Nenhum evento ainda
            </p>
            <Link
              href="/dashboard/new"
              className="text-xs font-medium"
              style={{ color: "oklch(0.62 0.14 25)" }}
            >
              Criar o primeiro evento →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((event, i) => (
              <EventCard key={event.slug} event={event} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
