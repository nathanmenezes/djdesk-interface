import { notFound, redirect } from "next/navigation";
import { getPublicEvent } from "@/services/public.service";
import { Music2 } from "lucide-react";

interface Props {
  params: Promise<{ token: string }>;
}

export default async function BriefingLandingPage({ params }: Props) {
  const { token } = await params;

  let event;
  try {
    event = await getPublicEvent(token);
  } catch {
    notFound();
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-2xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center">
            <Music2 className="text-purple-400" size={28} />
          </div>
        </div>

        <div>
          <p className="text-zinc-500 text-sm uppercase tracking-widest mb-2">
            {event.djArtisticName}
          </p>
          <h1 className="text-3xl font-bold text-zinc-100">{event.name}</h1>
          <p className="text-zinc-400 mt-2">
            Olá, <span className="text-zinc-200 font-medium">{event.clientName}</span>!
          </p>
        </div>

        <p className="text-zinc-400 leading-relaxed">
          Vamos bater um papo rápido para que eu entenda melhor o que você
          espera da música na sua festa. São só alguns minutos!
        </p>

        {event.eventDate && (
          <p className="text-zinc-500 text-sm">
            📅{" "}
            {new Intl.DateTimeFormat("pt-BR", { dateStyle: "long" }).format(
              new Date(event.eventDate)
            )}
          </p>
        )}

        <a
          href={`/briefing/${token}/chat`}
          className="inline-flex items-center justify-center w-full py-3.5 px-6 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium transition text-sm"
        >
          Começar briefing
        </a>
      </div>
    </div>
  );
}
