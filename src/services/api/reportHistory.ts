import { reportsSeed } from "@/services/mock/reportsSeed";
import { ticketHistorySeed } from "@/services/mock/ticketHistorySeed";
import type { TicketHistory, TicketStatus } from "@/types/ticketHistory";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const getTimelineByTicketId = async (
  ticketId: string
): Promise<Array<TicketHistory>> => {
  // Simulasi network
  await delay(500);

  // 1. FILTERING (SQL: WHERE reportId = ticketId)
  const histories = ticketHistorySeed.filter((item) => item.reportId === ticketId);

  // 2. SORTING (Descending: Terbaru paling atas)
  // Algoritma sort javascript menggunakan nilai return positif/negatif
  // Waktu B - Waktu A = Descending (Besar ke Kecil)
  histories.sort((a, b) => {
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });

  return histories;
};

export const updateTicketStatus = async (
  reportId: string,
  newStatus: TicketStatus,
  note?: string
): Promise<TicketHistory> => {
  await new Promise((r) => setTimeout(r, 500));

  const newHistory: TicketHistory = {
    id: `H-${Date.now()}`,
    reportId: reportId,
    status: newStatus,
    technicalNotes: note || "",
    timestamp: new Date().toISOString(),
    actor: "Budi Santoso",
  };

  ticketHistorySeed.push(newHistory);

  const reportIndex = reportsSeed.findIndex((r) => r.id === reportId);
  if (reportIndex !== -1) {
    reportsSeed[reportIndex].status = newStatus;
  }

  return newHistory;
};
