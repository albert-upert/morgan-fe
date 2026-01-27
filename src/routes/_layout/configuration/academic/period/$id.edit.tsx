import { createFileRoute } from "@tanstack/react-router";
import { CreatePeriodView } from "@/views/configuration/academic/period/CreatePeriodView";

export const Route = createFileRoute(
  "/_layout/configuration/academic/period/$id/edit"
)({
  component: () => <CreatePeriodView mode="edit" />,
});
