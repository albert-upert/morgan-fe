import { createFileRoute } from "@tanstack/react-router";
import { ChecklistDashboardView } from "@/views/housekeeping/ChecklistDashboardPage";

export const Route = createFileRoute("/_layout/checklist-dashboard/")({
  component: ChecklistDashboardView,
});
