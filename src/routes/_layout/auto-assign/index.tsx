import { createFileRoute } from "@tanstack/react-router";
import { AutoAssignView } from "@/views/auto-assign/AutoAssignView";

export const Route = createFileRoute("/_layout/auto-assign/")({
  component: AutoAssignView,
});
