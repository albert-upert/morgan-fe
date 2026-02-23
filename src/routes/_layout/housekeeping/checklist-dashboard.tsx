import { createFileRoute } from "@tanstack/react-router";
import { RoomListView } from "@/views/housekeeping/ChecklistDashboardPage";

export const Route = createFileRoute(
  "/_layout/housekeeping/checklist-dashboard"
)({
  component: RoomListView,
});
