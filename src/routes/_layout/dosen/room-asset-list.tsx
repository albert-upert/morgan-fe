import { createFileRoute, redirect } from "@tanstack/react-router";
import { getUser } from "@/lib/auth";
import { RoomAssetListView } from "@/views/dosen/RoomAssetListView";

export const Route = createFileRoute("/_layout/dosen/room-asset-list")({
  beforeLoad: async ({ location, context }) => {
    const user = await getUser(context.queryClient);
    if (!user) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: RoomAssetListView,
});
