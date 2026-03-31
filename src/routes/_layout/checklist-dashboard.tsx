import { createFileRoute } from "@tanstack/react-router";
import { ChecklistDashboardView } from "@/views/checklist/HkChecklistDashboardPage";

export const Route = createFileRoute("/_layout/checklist-dashboard")({
  component: ChecklistDashboardView,
});
