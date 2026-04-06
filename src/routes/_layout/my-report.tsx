import { createFileRoute } from "@tanstack/react-router";
import { MyReportView } from "@/views/report/LecturerReportPage";

export const Route = createFileRoute("/_layout/my-report")({
  component: MyReportView,
});
