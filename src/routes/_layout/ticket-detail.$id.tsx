import { createFileRoute } from "@tanstack/react-router";
import { TicketDetailView } from "@/views/ticketing/TicketDetailPage";

export const Route = createFileRoute("/_layout/ticket-detail/$id")({
  component: TicketDetailView,
});
