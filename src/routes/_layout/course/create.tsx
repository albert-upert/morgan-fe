import { createFileRoute } from "@tanstack/react-router";
import { CreateCourseView } from "@/views/course/CreateCourseView";

export const Route = createFileRoute("/_layout/course/create")({
  component: CreateCourseView,
});
