import { createFileRoute } from "@tanstack/react-router";
import { TicketDetailView } from "@/views/fm-it/TicketDetailPageView";

export const Route = createFileRoute("/_layout/fm-it/ticket-detail/$id")({
  component: TicketDetailView,
});
