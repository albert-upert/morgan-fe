export type TicketStatus =
  | "Menunggu Diterima oleh Petugas"
  | "Petugas dalam Perjalanan"
  | "Sedang Dikerjakan"
  | "Laporan Selesai";

export interface TicketHistory {
  id: string;
  reportId: string;
  status: TicketStatus;
  technicalNotes?: string;
  photoUrl?: string;
  timestamp: string;
  actor: string;
}
