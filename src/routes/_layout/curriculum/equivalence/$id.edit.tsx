import { createFileRoute } from "@tanstack/react-router";
import { AssignCurriculumCoursesView } from "@/views/curriculum/AssignCurriculumCoursesView";

export const Route = createFileRoute(
  "/_layout/curriculum/equivalence/$id/edit"
)({
  component: () => <AssignCurriculumCoursesView mode="edit" />,
});
