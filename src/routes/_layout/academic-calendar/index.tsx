import { createFileRoute } from "@tanstack/react-router";
import { CalendarListView } from "@/views/academic-calendar/CalendarListView";

export const Route = createFileRoute("/_layout/academic-calendar/")({
  component: CalendarListView,
});
