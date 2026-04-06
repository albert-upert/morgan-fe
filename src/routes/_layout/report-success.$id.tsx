import { createFileRoute } from "@tanstack/react-router";
import { ReportDetailPageView } from "@/views/report/LecturerDetailReportPage";

export const Route = createFileRoute("/_layout/report-success/$id")({
  component: () => <ReportDetailPageView viewMode="success" />,
});
