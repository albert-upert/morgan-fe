import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { getUser } from "@/lib/auth";

export const Route = createFileRoute("/_layout/room-asset-list")({
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

    // Only redirect when user is exactly on /room-asset-list (not the $roomId child route)
    if (location.pathname !== "/room-asset-list") return;

    throw redirect({
      to: "/room-asset-list/$roomId",
      params: { roomId: "0001" },
      replace: true,
    });
  },
  component: Outlet,
});
