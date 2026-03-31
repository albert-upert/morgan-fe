import { createFileRoute } from "@tanstack/react-router";
import { ReportSuccessView } from "@/views/lecturer/ReportSuccessView";

export const Route = createFileRoute("/_layout/report-success")({
  component: ReportSuccessView,
});
