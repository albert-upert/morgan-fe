import { createFileRoute, redirect } from "@tanstack/react-router";
import { getUser } from "@/lib/auth";
import { RoomDetailView } from "@/views/housekeeping/RoomChecklistPage";

export const Route = createFileRoute(
  "/_layout/housekeeping/room-checklist/$roomId"
)({
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
  component: RoomDetailView,
});
