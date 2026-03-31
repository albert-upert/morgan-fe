import { createFileRoute } from "@tanstack/react-router";
import { RoomChecklistView } from "@/views/checklist/modalChecklist/RoomChecklistPage";

export const Route = createFileRoute(
  "/_layout/housekeeping/room-checklist/$id"
)({
  component: RoomChecklistView,
});
