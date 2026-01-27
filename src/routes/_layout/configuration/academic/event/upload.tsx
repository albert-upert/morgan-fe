import { createFileRoute } from "@tanstack/react-router";
import { UploadEventView } from "@/views/configuration/academic/event/UploadEventView";

export const Route = createFileRoute(
  "/_layout/configuration/academic/event/upload"
)({
  component: UploadEventView,
});
