import { createFileRoute } from "@tanstack/react-router";
import { UploadEventCalendarResultView } from "@/views/academic-calendar/UploadEventCalendarResultView";

export const Route = createFileRoute(
  "/_layout/academic-calendar/upload-result"
)({
  component: UploadEventCalendarResultView,
});
