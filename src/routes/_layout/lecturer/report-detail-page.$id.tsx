import { createFileRoute } from "@tanstack/react-router";
import { ReportDetailPageView } from "@/views/lecturer/ReportDetailPageView.tsx";

export const Route = createFileRoute(
  "/_layout/lecturer/report-detail-page/$id"
)({
  component: ReportDetailPageView,
});
