import { createFileRoute } from "@tanstack/react-router";
import { CourseScheduleListView } from "@/views/course-schedule/CourseScheduleListView";

export const Route = createFileRoute("/_layout/course-schedule/")({
  component: CourseScheduleListView,
});
