import { createFileRoute } from "@tanstack/react-router";
import { UploadCourseResultView } from "@/views/course/UploadCourseResultView";

export const Route = createFileRoute("/_layout/course/upload-result")({
  component: UploadCourseResultView,
});
