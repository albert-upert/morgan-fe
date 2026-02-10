import { createFileRoute, redirect } from "@tanstack/react-router";
import { getUser } from "@/lib/auth";

export const Route = createFileRoute(
  "/_layout/lecturer/room-asset-list/$roomId"
)({
  beforeLoad: async ({ location, context, params }) => {
    const user = await getUser(context.queryClient);
    if (!user) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }

    // Keep old lecturer path working but canonicalize to the new path (without /lecturer)
    throw redirect({
      to: "/room-asset-list/$roomId",
      params,
      replace: true,
    });
  },
});
