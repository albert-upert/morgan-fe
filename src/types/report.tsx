export type Report = {
  id: string;
  status:
    | "Menunggu Diterima oleh Petugas"
    | "Petugas dalam Perjalanan"
    | "Sedang Dikerjakan"
    | "Laporan Selesai";
  assets: Array<string>;
  room: string;
  building: string;
  date: string;
  time: string;
  reporter: string;
  reporterRole: string;
  photoUrl: string | null;
  description: string;
};
