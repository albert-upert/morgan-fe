import { createFileRoute } from "@tanstack/react-router";
import { ChecklistReportView } from "@/views/report/HkDetailReportPage";

export const Route = createFileRoute("/_layout/checklist-report/$id")({
  component: ChecklistReportView,
});
