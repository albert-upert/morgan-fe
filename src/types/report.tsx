export type Report = {
  id: string;
  pic?: string;
  status:
    | "Menunggu Petugas"
    | "Petugas dalam Perjalanan"
    | "Sedang Dikerjakan"
    | "Laporan Selesai"
    | "Pelapor Memberikan Feedback";
  assets: Array<string>;
  room: string;
  building: string;
  date: string;
  time: string;
  reporter: string;
  reporterRole: string;
  photoUrl: string;
  description: string;
};
