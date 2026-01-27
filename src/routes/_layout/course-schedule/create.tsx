import { createFileRoute } from "@tanstack/react-router";
import { CreateCourseScheduleView } from "@/views/course-schedule/CreateCourseScheduleView";

export const Route = createFileRoute("/_layout/course-schedule/create")({
  component: CreateCourseScheduleView,
});
