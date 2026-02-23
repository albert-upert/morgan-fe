import { createFileRoute } from "@tanstack/react-router";
import { RoomAssetListView } from "@/views/lecturer/RoomAssetListView";

export const Route = createFileRoute("/_layout/lecturer/room-asset-list/$id")({
  component: RoomAssetListView,
});
