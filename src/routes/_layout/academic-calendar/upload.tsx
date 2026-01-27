import { createFileRoute } from "@tanstack/react-router";
import { UploadEventCalendarView } from "@/views/academic-calendar/UploadEventCalendarView";

export const Route = createFileRoute("/_layout/academic-calendar/upload")({
  component: UploadEventCalendarView,
});
