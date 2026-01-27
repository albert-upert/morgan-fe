import { createFileRoute, redirect } from "@tanstack/react-router";
import { CurriculumListView } from "@/views/curriculum/CurriculumListView";

const validTypes = ["list", "structure", "equivalence"] as const;
type CurriculumType = (typeof validTypes)[number];

export const Route = createFileRoute("/_layout/curriculum/$type")({
  beforeLoad: ({ params }) => {
    if (!validTypes.includes(params.type as CurriculumType)) {
      throw redirect({
        to: "/curriculum/$type",
        params: { type: "list" },
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { type } = Route.useParams();
  return <CurriculumListView type={type as CurriculumType} />;
}
