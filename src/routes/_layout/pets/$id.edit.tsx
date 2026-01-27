import { createFileRoute } from "@tanstack/react-router";
import { EditPetView } from "@/views/pets/EditPetView";

export const Route = createFileRoute("/_layout/pets/$id/edit")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  return <EditPetView id={id} />;
}
