import { createFileRoute } from "@tanstack/react-router";
import { HkRoomChecklistPage } from "@/views/checklist/HkRoomChecklistPage";

export const Route = createFileRoute("/_layout/room-checklist/$id")({
  component: HkRoomChecklistPage,
});
