import { MOCK_TIMELINES } from "@/services/mock/mockHistories.ts";
import type { TicketHistory } from "@/types/ticketHistory";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const getTimelineByTicketId = async (
  ticketId: string
): Promise<Array<TicketHistory>> => {
  // Simulasi network
  await delay(500);

  // 1. FILTERING (SQL: WHERE reportId = ticketId)
  const histories = MOCK_TIMELINES.filter((item) => item.reportId === ticketId);

  // 2. SORTING (Descending: Terbaru paling atas)
  // Algoritma sort javascript menggunakan nilai return positif/negatif
  // Waktu B - Waktu A = Descending (Besar ke Kecil)
  histories.sort((a, b) => {
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });

  return histories;
};
