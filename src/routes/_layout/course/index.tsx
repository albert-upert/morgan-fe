import { createFileRoute } from "@tanstack/react-router";
import { CourseListView } from "@/views/course/CourseListView";

export const Route = createFileRoute("/_layout/course/")({
  component: CourseListView,
});
