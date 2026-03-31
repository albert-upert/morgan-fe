import { createFileRoute } from "@tanstack/react-router";
import { ReportDetailPageView } from "@/views/lecturer/ReportDetailPageView";

export const Route = createFileRoute("/_layout/report-detail-page/$id")({
  component: ReportDetailPageView,
});
