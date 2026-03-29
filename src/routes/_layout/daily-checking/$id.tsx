import { createFileRoute } from "@tanstack/react-router";
import { RoomChecklistView } from "@/views/housekeeping/RoomChecklistPage";

export const Route = createFileRoute("/_layout/daily-checking/$id")({
  component: RoomChecklistView,
});
