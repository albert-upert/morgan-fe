import { reportsSeed } from "@/services/mock/mockReport.ts";
import type { Report } from "@/types/report";

export const getReportById = (id: string): Report => {
  // 2. Cari data di array (Logic SQL sederhana: SELECT * FROM reports WHERE id = id)
  const foundReport = reportsSeed.find((item: Report) => item.id === id);

  if (!foundReport) {
    throw new Error(`Laporan dengan ID ${id} tidak ditemukan.`);
  }

  return foundReport;
};

export const getAllReports = (): Array<Report> => {
  return reportsSeed;
};
