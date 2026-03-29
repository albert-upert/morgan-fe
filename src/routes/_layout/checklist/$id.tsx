import { createFileRoute } from "@tanstack/react-router";
import { ChecklistReportView } from "@/views/housekeeping/ChecklistReportPage";

export const Route = createFileRoute("/_layout/checklist/$id")({
  component: ChecklistReportView,
});
