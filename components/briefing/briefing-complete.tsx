import { CheckCircle } from "lucide-react";

interface BriefingCompleteProps {
  djName: string;
}

export function BriefingComplete({ djName }: BriefingCompleteProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8 px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-purple-600/20 border border-purple-500/40 flex items-center justify-center">
        <CheckCircle className="text-purple-400" size={32} />
      </div>
      <div>
        <p className="text-zinc-100 font-semibold text-lg">Briefing concluído!</p>
        <p className="text-zinc-400 text-sm mt-1">
          {djName} já pode ver suas preferências musicais e preparar a playlist
          perfeita para você.
        </p>
      </div>
    </div>
  );
}
