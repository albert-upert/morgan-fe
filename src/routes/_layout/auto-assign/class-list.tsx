import { createFileRoute } from "@tanstack/react-router";
import { ClassListView } from "@/views/auto-assign/ClassListView";

export const Route = createFileRoute("/_layout/auto-assign/class-list")({
  component: ClassListView,
});
