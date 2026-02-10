import { createFileRoute } from "@tanstack/react-router";
import { TicketDetailView } from "@/views/fm-it/TicketDetailPageView";

export const Route = createFileRoute("/_layout/fm-it/ticket-detail/$id")({
  component: TicketDetailView,
});

import { createFileRoute, redirect } from "@tanstack/react-router";
import { getUser } from "@/lib/auth";
import { TicketDetailView } from "@/views/fm-it/TicketDetailPageView";

export const Route = createFileRoute("/_layout/fm-it/ticket-detail/$id")({
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
  component: TicketDetailView,
});
