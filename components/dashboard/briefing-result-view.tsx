import type { BriefingResultResponse } from "@/types/briefing";

interface BriefingResultViewProps {
  result: BriefingResultResponse;
}

export function BriefingResultView({ result }: BriefingResultViewProps) {
  return (
    <div className="flex flex-col gap-6">
      <SectionCard title="Resumo do evento">
        <p className="text-sm leading-relaxed" style={{ color: "oklch(0.68 0.06 25)" }}>
          {result.summary}
        </p>
        {result.guestProfile && (
          <p className="mt-2 text-xs" style={{ color: "oklch(0.48 0.08 25)" }}>
            <span style={{ color: "oklch(0.62 0.14 25)" }}>Perfil dos convidados:</span>{" "}
            {result.guestProfile}
          </p>
        )}
      </SectionCard>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {result.vibe && (
          <SectionCard title="Vibe da festa">
            <p className="text-sm" style={{ color: "oklch(0.68 0.06 25)" }}>{result.vibe}</p>
          </SectionCard>
        )}

        {result.preferredStyles.length > 0 && (
          <SectionCard title="Estilos preferidos">
            <TagList tags={result.preferredStyles} variant="preferred" />
          </SectionCard>
        )}

        {result.forbiddenStyles.length > 0 && (
          <SectionCard title="Estilos proibidos">
            <TagList tags={result.forbiddenStyles} variant="forbidden" />
          </SectionCard>
        )}
      </div>

      {result.requiredSongs.length > 0 && (
        <SectionCard title={`Músicas obrigatórias (${result.requiredSongs.length})`}>
          <div className="flex flex-col gap-2">
            {result.requiredSongs.map((song, i) => (
              <div
                key={i}
                className="flex items-start justify-between rounded-lg px-3 py-2.5"
                style={{ background: "oklch(0.09 0.028 25 / 0.8)" }}
              >
                <div>
                  <p className="text-sm font-medium" style={{ color: "oklch(0.82 0.06 18)" }}>
                    {song.title}
                  </p>
                  <p className="text-xs" style={{ color: "oklch(0.52 0.1 25)" }}>
                    {song.artist}
                  </p>
                  {song.notes && (
                    <p className="mt-1 text-xs" style={{ color: "oklch(0.42 0.08 25)" }}>
                      {song.notes}
                    </p>
                  )}
                </div>
                {song.moment && (
                  <span
                    className="shrink-0 ml-3 rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide"
                    style={{
                      background: "oklch(0.22 0.1 25 / 0.6)",
                      color: "oklch(0.62 0.14 25)",
                      border: "1px solid oklch(0.32 0.12 25 / 0.5)",
                    }}
                  >
                    {song.moment}
                  </span>
                )}
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {result.forbiddenSongs.length > 0 && (
        <SectionCard title={`Músicas proibidas (${result.forbiddenSongs.length})`}>
          <div className="flex flex-col gap-2">
            {result.forbiddenSongs.map((song, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg px-3 py-2.5"
                style={{ background: "oklch(0.09 0.028 25 / 0.8)" }}
              >
                <p className="text-sm" style={{ color: "oklch(0.72 0.06 18)" }}>
                  {song.titleOrArtist}
                </p>
                {song.reason && (
                  <p className="text-xs ml-3" style={{ color: "oklch(0.42 0.08 25)" }}>
                    {song.reason}
                  </p>
                )}
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {result.moments.length > 0 && (
        <SectionCard title={`Momentos da festa (${result.moments.length})`}>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {result.moments.map((moment, i) => (
              <div
                key={i}
                className="rounded-lg p-3"
                style={{
                  background: "oklch(0.09 0.028 25 / 0.8)",
                  border: "1px solid oklch(0.22 0.08 25 / 0.5)",
                }}
              >
                <p className="text-sm font-semibold" style={{ color: "oklch(0.82 0.06 18)" }}>
                  {moment.name}
                </p>
                {moment.vibe && (
                  <p className="mt-1 text-xs" style={{ color: "oklch(0.58 0.1 25)" }}>
                    {moment.vibe}
                  </p>
                )}
                {moment.styles && moment.styles.length > 0 && (
                  <div className="mt-2">
                    <TagList tags={moment.styles} variant="preferred" />
                  </div>
                )}
                {moment.observation && (
                  <p className="mt-2 text-xs" style={{ color: "oklch(0.42 0.08 25)" }}>
                    {moment.observation}
                  </p>
                )}
              </div>
            ))}
          </div>
        </SectionCard>
      )}
    </div>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-xl p-5"
      style={{
        background: "oklch(0.11 0.032 25)",
        border: "1px solid oklch(0.26 0.09 25 / 0.7)",
      }}
    >
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: "oklch(0.52 0.1 25)" }}>
        {title}
      </h3>
      {children}
    </div>
  );
}

function TagList({ tags, variant }: { tags: string[]; variant: "preferred" | "forbidden" }) {
  const color =
    variant === "preferred"
      ? { bg: "oklch(0.18 0.06 140 / 0.4)", text: "oklch(0.62 0.14 140)", border: "oklch(0.28 0.1 140 / 0.4)" }
      : { bg: "oklch(0.18 0.06 25 / 0.4)", text: "oklch(0.62 0.14 15)", border: "oklch(0.28 0.1 15 / 0.4)" };

  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag, i) => (
        <span
          key={i}
          className="rounded-full px-2.5 py-0.5 text-xs font-medium"
          style={{ background: color.bg, color: color.text, border: `1px solid ${color.border}` }}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
