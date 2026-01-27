import { createFileRoute } from "@tanstack/react-router";
import { CreateEquivalenceView } from "@/views/curriculum/CreateEquivalenceView";

export const Route = createFileRoute("/_layout/curriculum/equivalence/create")({
  component: CreateEquivalenceView,
});
