import { createFileRoute } from "@tanstack/react-router";
import { ReportHistoryPage } from "@/views/housekeeping/ReportHistoryPage";

export const Route = createFileRoute("/_layout/housekeeping/report-history")({
  component: ReportHistoryPage,
});
