import { createFileRoute, redirect } from "@tanstack/react-router";
import { getUser } from "@/lib/auth";
import { RoomAssetListView } from "@/views/lecturer/RoomAssetListView";

export const Route = createFileRoute("/_layout/room-asset-list/$roomId")({
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
