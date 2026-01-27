import { createFileRoute } from "@tanstack/react-router";
import { ImportFetView } from "@/views/course-schedule/ImportFetView";

export const Route = createFileRoute("/_layout/course-schedule/import")({
  component: ImportFetView,
});
