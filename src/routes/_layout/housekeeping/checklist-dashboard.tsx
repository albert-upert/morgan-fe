import { createFileRoute, redirect } from "@tanstack/react-router";
import { getUser } from "@/lib/auth";
import { RoomListView } from "@/views/housekeeping/ChecklistDashboardPage";

export const Route = createFileRoute(
  "/_layout/housekeeping/checklist-dashboard"
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
  component: RoomListView,
});
