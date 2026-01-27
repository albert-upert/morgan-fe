import { createFileRoute } from "@tanstack/react-router";
import { EditUserView } from "@/views/configuration/user-management/EditUserView";

export const Route = createFileRoute(
  "/_layout/configuration/user-management/$id/edit"
)({
  component: EditUserView,
});
