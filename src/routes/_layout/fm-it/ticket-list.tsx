import { createFileRoute } from "@tanstack/react-router";
import { TicketListView } from "@/views/fm-it/TicketListPageView";

export const Route = createFileRoute("/_layout/fm-it/ticket-list")({
  component: TicketListView,
});
