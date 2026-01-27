import { createFileRoute } from "@tanstack/react-router";
import { CreateUserView } from "@/views/configuration/user-management/CreateUserView";

export const Route = createFileRoute(
  "/_layout/configuration/user-management/create"
)({
  component: CreateUserView,
});
