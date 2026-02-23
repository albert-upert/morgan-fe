import type { SubmitReportIssueResponse } from "@/services/morgan/report-success-store";
import type { ReportIssuePayload } from "@/views/lecturer/report-issue-modal";

export async function submitReportIssue(
  _payload: ReportIssuePayload
): Promise<SubmitReportIssueResponse> {
  // Mock: simulate network delay + generate ticket id
  await new Promise((r) => setTimeout(r, 600));

  return {
    ticketId: `#FM-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000 + 1000)}`,
    statusLabel: "Selesai",
    createdAt: new Date().toISOString(),
  };
}
