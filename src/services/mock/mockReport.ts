import type { Report } from "@/types/report.tsx";

export const reportsSeed: Array<Report> = [
  {
    id: "#FM-2025-0103",
    status: "Menunggu Petugas",
    assets: ["Proyektor Epson", "Air Conditioner (AC)"],
    room: "2805",
    building: "Griya Legita",
    date: "05 Oktober 2025",
    time: "08:09 WIB",
    reporter: "Dedi Permana",
    reporterRole: "Dosen",
    photoUrl: "bukti-kerusakan.jpg",
    description:
      "Proyektor tidak mau menyala saat ditekan tombol power, dan AC meneteskan air.",
  },
  {
    id: "#FM-2025-0102",
    status: "Menunggu Petugas",
    assets: ["Fingerprint"],
    room: "2808",
    building: "Griya Legita",
    date: "05 Oktober 2025",
    time: "08:30 WIB",
    reporter: "Siti Aminah",
    reporterRole: "Staff",
    photoUrl: null,
    description: "Mesin fingerprint tidak merespon input jari.",
  },
];
