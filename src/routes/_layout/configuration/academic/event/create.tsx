import { createFileRoute } from "@tanstack/react-router";
import { CreateEventView } from "@/views/configuration/academic/event/CreateEventView";

export const Route = createFileRoute(
  "/_layout/configuration/academic/event/create"
)({
  component: CreateEventView,
});
