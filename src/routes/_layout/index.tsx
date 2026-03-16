import { createFileRoute } from "@tanstack/react-router";
import { DashboardView } from "@/views/dashboard/DashboardView";

export const Route = createFileRoute("/_layout/")({
  component: DashboardView,
});
