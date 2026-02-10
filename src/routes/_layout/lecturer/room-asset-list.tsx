import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { getUser } from "@/lib/auth";

export const Route = createFileRoute("/_layout/lecturer/room-asset-list")({
  // Keep old path working by redirecting to a dummy room id.
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

    // Only redirect when user is exactly on /lecturer/room-asset-list (not the $roomId child route)
    if (location.pathname !== "/lecturer/room-asset-list") return;

    throw redirect({
      to: "/lecturer/room-asset-list/$roomId",
      params: { roomId: "0001" },
      replace: true,
    });
  },
  component: Outlet,
});
