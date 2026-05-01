export enum EventStatus {
  CREATED = "CREATED",
  LINK_SENT = "LINK_SENT",
  BRIEFING_STARTED = "BRIEFING_STARTED",
  BRIEFING_IN_PROGRESS = "BRIEFING_IN_PROGRESS",
  BRIEFING_COMPLETED = "BRIEFING_COMPLETED",
  PLAYLIST_GENERATED = "PLAYLIST_GENERATED",
  REVIEWED_BY_DJ = "REVIEWED_BY_DJ",
}

export const EVENT_STATUS_LABELS: Record<EventStatus, string> = {
  [EventStatus.CREATED]: "Criado",
  [EventStatus.LINK_SENT]: "Link enviado",
  [EventStatus.BRIEFING_STARTED]: "Briefing iniciado",
  [EventStatus.BRIEFING_IN_PROGRESS]: "Briefing em andamento",
  [EventStatus.BRIEFING_COMPLETED]: "Briefing finalizado",
  [EventStatus.PLAYLIST_GENERATED]: "Playlist gerada",
  [EventStatus.REVIEWED_BY_DJ]: "Revisado pelo DJ",
};

export const SUGGESTED_EVENT_TYPES = [
  "Casamento",
  "Aniversário",
  "Corporativo",
  "Festa universitária",
  "Bar / Lounge",
  "Outro",
];

export const SUGGESTED_ADDITIONAL_FIELDS = [
  { key: "time", label: "Horário" },
  { key: "location", label: "Local" },
  { key: "estimatedDuration", label: "Duração estimada" },
  { key: "guestCount", label: "Qtd. de convidados" },
  { key: "averageAge", label: "Faixa etária média" },
  { key: "expectedVibe", label: "Vibe esperada" },
  { key: "knownStyles", label: "Estilos conhecidos" },
  { key: "notes", label: "Observações" },
];

export interface EventResponse {
  slug: string;
  name: string;
  clientName: string;
  type: string | null;
  status: EventStatus;
  publicLink: string;
  eventDate: string | null;
  additionalInfo: Record<string, string> | null;
  createdAt: string;
}

export interface CreateEventPayload {
  name: string;
  clientName: string;
  type?: string;
  eventDate?: string;
  additionalInfo?: Record<string, string>;
}
