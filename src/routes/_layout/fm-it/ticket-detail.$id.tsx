import { createFileRoute } from "@tanstack/react-router";
import { TicketDetailView } from "@/views/fm-it/TicketDetailPageView";

export const Route = createFileRoute("/_layout/fm-it/ticket-detail/$id")({
  component: TicketDetailView,
});

import { createFileRoute, redirect } from "@tanstack/react-router";
import { getUser } from "@/lib/auth";
import { createFileRoute } from "@tanstack/react-router";
import { TicketDetailView } from "@/views/fm-it/TicketDetailPageView";

export const Route = createFileRoute("/_layout/fm-it/ticket-detail/$id")({
  component: TicketDetailView,
});
