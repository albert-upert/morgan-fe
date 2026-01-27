import { createFileRoute } from "@tanstack/react-router";
import { CreateCurriculumView } from "@/views/curriculum/CreateCurriculumView";

export const Route = createFileRoute("/_layout/curriculum/create")({
  component: CreateCurriculumView,
});
