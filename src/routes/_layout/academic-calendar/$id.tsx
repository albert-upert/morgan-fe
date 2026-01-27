import { createFileRoute } from "@tanstack/react-router";
import { CalendarDetailView } from "@/views/academic-calendar/CalendarDetailView";

export const Route = createFileRoute("/_layout/academic-calendar/$id")({
  component: CalendarDetailView,
});
