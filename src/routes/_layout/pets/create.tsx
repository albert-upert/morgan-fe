import { createFileRoute } from "@tanstack/react-router";
import { CreatePetView } from "@/views/pets/CreatePetView";

export const Route = createFileRoute("/_layout/pets/create")({
  component: CreatePetView,
});
