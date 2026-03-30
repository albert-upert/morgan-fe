import { createFileRoute } from "@tanstack/react-router";
import { MyReportView } from "@/views/lecturer/MyReportView";

export const Route = createFileRoute("/_layout/my-report")({
  component: MyReportView,
});
