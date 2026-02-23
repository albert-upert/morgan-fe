import { createFileRoute } from "@tanstack/react-router";
import { RoomDetailView } from "@/views/housekeeping/RoomChecklistPage";

export const Route = createFileRoute(
  "/_layout/housekeeping/room-checklist/$id"
)({
  component: RoomDetailView,
});
