import { useState } from "react";
import { reportsSeed } from "@/services/mock/mockReport.ts";
import type { Report } from "@/types/report";

// Simulasi delay network (biar kerasa loading-nya)
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const [USE_MOCK, setusemock] = useState(true);

setusemock(true);

export const getReportById = async (id: string): Promise<Report> => {
  // 1. Pura-pura loading 1 detik
  await delay(1000);

  // 2. Cari data di array (Logic SQL sederhana: SELECT * FROM reports WHERE id = id)
  const foundReport = reportsSeed.find((item: Report) => item.id === id);

  // 3. Throw error jika tidak ketemu (Simulasi 404)
  if (!foundReport) {
    throw new Error(`Laporan dengan ID ${id} tidak ditemukan.`);
  }

  return foundReport;
};

export const getAllReports = async (): Promise<Array<Report>> => {
  if (USE_MOCK) {
    // 1. Simulasi loading
    await delay(800);

    // 2. Return semua data (Array)
    return reportsSeed;
  }

  // Nanti di sini panggil API backend: return api.getReports();
  throw new Error("Backend not implemented");
};
