import { createFileRoute } from "@tanstack/react-router";
import { GenerateAcademicHistoryView } from "@/views/academic-calendar/GenerateAcademicHistoryView";

export const Route = createFileRoute(
  "/_layout/academic-calendar/generate-academic-history"
)({
  component: GenerateAcademicHistoryView,
});
