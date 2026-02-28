import type { TicketHistory } from "@/types/ticketHistory.ts";

export const ticketHistorySeed: Array<TicketHistory> = [
  {
    id: "H-1",
    reportId: "#FM-2025-0103",
    status: "Menunggu Petugas",
    timestamp: "2025-10-05T08:09:00",
    actor: "Budi Santoso",
  },
  {
    id: "H-2",
    reportId: "#FM-2025-0103",
    status: "Petugas dalam Perjalanan",
    timestamp: "2025-10-05T08:11:00",
    actor: "Budi Santoso",
  },
];
