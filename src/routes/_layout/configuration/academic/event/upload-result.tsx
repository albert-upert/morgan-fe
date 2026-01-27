import { createFileRoute } from "@tanstack/react-router";
import { UploadEventResultView } from "@/views/configuration/academic/event/UploadEventResultView";

export const Route = createFileRoute(
  "/_layout/configuration/academic/event/upload-result"
)({
  component: UploadEventResultView,
});
