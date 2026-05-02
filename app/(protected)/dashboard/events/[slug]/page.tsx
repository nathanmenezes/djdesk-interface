import { notFound } from "next/navigation";
import Link from "next/link";
import { eventService } from "@/services/event.service";
import { EVENT_STATUS_LABELS, EventStatus } from "@/types/event";
import { CopyLinkButton } from "@/components/dashboard/copy-link-button";
import { BriefingResultView } from "@/components/dashboard/briefing-result-view";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const event = await eventService.find(slug).catch(() => null);
  if (!event) notFound();

  const briefingResult =
    event.status === EventStatus.BRIEFING_COMPLETED ||
    event.status === EventStatus.PLAYLIST_GENERATED ||
    event.status === EventStatus.REVIEWED_BY_DJ
      ? await eventService.getBriefingResult(slug).catch(() => null)
      : null;

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "";
  const briefingUrl = `${baseUrl}/briefing/${event.publicLink}`;

  const formattedDate = event.eventDate
    ? new Date(event.eventDate).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link
        href="/dashboard"
        className="mb-6 inline-flex items-center gap-1.5 text-xs font-medium transition-colors"
        style={{ color: "oklch(0.48 0.08 25)" }}
      >
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5">
          <path d="M10 3L5 8l5 5" />
        </svg>
        Voltar
      </Link>

      <div className="mb-8 flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-bold" style={{ color: "oklch(0.88 0.05 18)" }}>
            {event.name}
          </h1>
          <StatusBadge status={event.status} />
        </div>
        <div className="flex flex-wrap gap-4 text-sm" style={{ color: "oklch(0.52 0.1 25)" }}>
          <span>{event.clientName}</span>
          {event.type && <span>{event.type}</span>}
          {formattedDate && <span>{formattedDate}</span>}
        </div>
      </div>

      <BriefingLinkCard briefingUrl={briefingUrl} />

      {event.additionalInfo && Object.keys(event.additionalInfo).length > 0 && (
        <AdditionalInfoCard info={event.additionalInfo} />
      )}

      {briefingResult && (
        <div className="mt-8">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest" style={{ color: "oklch(0.52 0.1 25)" }}>
            Resultado do Briefing
          </h2>
          <BriefingResultView result={briefingResult} />
        </div>
      )}

      {!briefingResult &&
        event.status !== EventStatus.BRIEFING_COMPLETED && (
          <div
            className="mt-6 rounded-xl p-6 text-center"
            style={{
              background: "oklch(0.11 0.032 25)",
              border: "1px solid oklch(0.22 0.08 25 / 0.5)",
            }}
          >
            <p className="text-sm" style={{ color: "oklch(0.48 0.08 25)" }}>
              Aguardando o cliente completar o briefing.
            </p>
          </div>
        )}
    </div>
  );
}

function StatusBadge({ status }: { status: EventStatus }) {
  return (
    <span
      className="rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide"
      style={{
        background: "oklch(0.22 0.1 25 / 0.6)",
        color: "oklch(0.68 0.14 25)",
        border: "1px solid oklch(0.32 0.12 25 / 0.5)",
      }}
    >
      {EVENT_STATUS_LABELS[status] ?? status}
    </span>
  );
}

function BriefingLinkCard({ briefingUrl }: { briefingUrl: string }) {
  return (
    <div
      className="rounded-xl p-5"
      style={{
        background: "oklch(0.11 0.032 25)",
        border: "1px solid oklch(0.26 0.09 25 / 0.7)",
      }}
    >
      <h2 className="mb-1 text-xs font-semibold uppercase tracking-widest" style={{ color: "oklch(0.52 0.1 25)" }}>
        Link do Briefing
      </h2>
      <p className="mb-3 text-xs" style={{ color: "oklch(0.42 0.08 25)" }}>
        Compartilhe este link com o seu cliente para iniciar o briefing musical.
      </p>
      <div
        className="mb-3 rounded-lg px-3 py-2.5 font-mono text-xs break-all"
        style={{
          background: "oklch(0.08 0.025 25 / 0.8)",
          color: "oklch(0.62 0.14 25)",
          border: "1px solid oklch(0.2 0.08 25 / 0.5)",
        }}
      >
        {briefingUrl}
      </div>
      <div className="flex gap-2">
        <CopyLinkButton url={briefingUrl} />
        <a
          href={`https://wa.me/?text=${encodeURIComponent(briefingUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200"
          style={{
            background: "oklch(0.18 0.08 150 / 0.5)",
            color: "oklch(0.62 0.18 150)",
            border: "1px solid oklch(0.3 0.12 150 / 0.4)",
          }}
        >
          <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 1.41.37 2.73 1.01 3.88L0 16l4.25-1.11A7.94 7.94 0 0 0 8 16c4.42 0 8-3.58 8-8s-3.58-8-8-8zm3.83 11.17c-.16.45-.94.88-1.3.93-.33.05-.75.07-1.2-.08-.28-.09-.64-.21-1.1-.41-1.93-.83-3.19-2.74-3.29-2.87-.1-.13-.8-1.06-.8-2.02s.51-1.43.69-1.63c.18-.2.4-.25.53-.25h.38c.12 0 .28-.04.44.33l.56 1.38c.05.13.08.28.01.43l-.21.47-.27.3c-.05.06-.1.13-.04.25.26.46.67 1.08 1.15 1.56.5.5 1.05.83 1.5 1.04.12.05.2.04.27-.02l.59-.67c.1-.12.2-.1.34-.06l1.33.63c.13.06.2.1.2.2v.74z" />
          </svg>
          WhatsApp
        </a>
      </div>
    </div>
  );
}

const ADDITIONAL_INFO_LABELS: Record<string, string> = {
  time: "Horário",
  location: "Local",
  estimatedDuration: "Duração estimada",
  guestCount: "Qtd. de convidados",
  averageAge: "Faixa etária",
  expectedVibe: "Vibe esperada",
  knownStyles: "Estilos conhecidos",
  notes: "Observações",
};

function AdditionalInfoCard({ info }: { info: Record<string, string> }) {
  return (
    <div
      className="mt-4 rounded-xl p-5"
      style={{
        background: "oklch(0.11 0.032 25)",
        border: "1px solid oklch(0.26 0.09 25 / 0.7)",
      }}
    >
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: "oklch(0.52 0.1 25)" }}>
        Informações do evento
      </h2>
      <dl className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
        {Object.entries(info).map(([key, value]) => (
          <div key={key}>
            <dt className="text-[10px] uppercase tracking-wide" style={{ color: "oklch(0.42 0.08 25)" }}>
              {ADDITIONAL_INFO_LABELS[key] ?? key}
            </dt>
            <dd className="mt-0.5 text-sm" style={{ color: "oklch(0.72 0.06 18)" }}>
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
