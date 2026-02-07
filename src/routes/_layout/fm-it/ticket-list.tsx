import { createFileRoute, redirect } from "@tanstack/react-router";
import { getUser } from "@/lib/auth";
import { TicketListView } from "@/views/fm-it/TicketListPageView";

export const Route = createFileRoute("/_layout/fm-it/ticket-list")({
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
  component: TicketListView,
});
