import { createFileRoute } from "@tanstack/react-router";
import { MyReportView } from "@/views/lecturer/MyReportView.tsx";

export const Route = createFileRoute("/_layout/lecturer/my-report")({
  component: MyReportView,
});
