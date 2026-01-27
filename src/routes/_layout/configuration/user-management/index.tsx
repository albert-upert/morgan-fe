import { createFileRoute } from "@tanstack/react-router";
import { UserListView } from "@/views/configuration/user-management/UserListView";

export const Route = createFileRoute("/_layout/configuration/user-management/")(
  {
    component: UserListView,
  }
);
