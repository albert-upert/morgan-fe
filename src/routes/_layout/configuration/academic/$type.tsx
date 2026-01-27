import { createFileRoute, redirect } from "@tanstack/react-router";
import { AcademicListView } from "@/views/configuration/academic/AcademicListView";

const validTypes = ["period", "event"] as const;
type AcademicType = (typeof validTypes)[number];

export const Route = createFileRoute("/_layout/configuration/academic/$type")({
  beforeLoad: ({ params }) => {
    if (!validTypes.includes(params.type as AcademicType)) {
      throw redirect({
        to: "/configuration/academic/$type",
        params: { type: "period" },
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { type } = Route.useParams();
  return <AcademicListView type={type as AcademicType} />;
}
