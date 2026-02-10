import type { ReportIssuePayload } from "@/views/lecturer/report-issue-modal";

export type ReportIssueResponse = {
  reportNumber: string;
  createdAt: string;
  status: "WAITING_OFFICER" | "IN_PROGRESS" | "DONE";
};

export async function submitReportIssue(payload: ReportIssuePayload) {
  // NOTE: Backend belum tersedia. Simulasikan request sukses.
  // Keep payload argument so later we can swap this implementation to real API call.
  void payload;

  await new Promise((r) => setTimeout(r, 900));

  return {
    reportNumber: "#MFT-2025-0103",
    createdAt: new Date().toISOString(),
    status: "WAITING_OFFICER",
  } satisfies ReportIssueResponse;
}
