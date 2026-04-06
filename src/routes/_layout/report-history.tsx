import { createFileRoute } from "@tanstack/react-router";
import { ReportHistoryPage } from "@/views/report/HkReportPage";

export const Route = createFileRoute("/_layout/report-history")({
  component: ReportHistoryPage,
});
