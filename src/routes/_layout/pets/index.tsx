import { createFileRoute } from "@tanstack/react-router";
import { PetsListView } from "@/views/pets/PetsListView";

export const Route = createFileRoute("/_layout/pets/")({
  component: PetsListView,
});
