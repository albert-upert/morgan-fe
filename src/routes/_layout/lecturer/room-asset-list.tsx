import { createFileRoute } from "@tanstack/react-router";
import { RoomAssetListView } from "@/views/checklist/LecturerRoomChecklistPage";

export const Route = createFileRoute("/_layout/lecturer/room-asset-list")({
  component: RoomAssetListView,
});
