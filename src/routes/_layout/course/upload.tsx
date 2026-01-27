import { createFileRoute } from "@tanstack/react-router";
import { UploadCourseView } from "@/views/course/UploadCourseView";

export const Route = createFileRoute("/_layout/course/upload")({
  component: UploadCourseView,
});
