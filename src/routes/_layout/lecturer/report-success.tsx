import { createFileRoute } from "@tanstack/react-router";
import { ReportSuccessView } from "@/views/lecturer/ReportSuccessView";

export const Route = createFileRoute("/_layout/lecturer/report-success")({
  component: ReportSuccessView,
});
