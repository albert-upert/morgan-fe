import { createFileRoute } from "@tanstack/react-router";
import { TicketListView } from "@/views/ticketing/TicketListPage";

export const Route = createFileRoute("/_layout/ticket-list")({
  component: TicketListView,
});
