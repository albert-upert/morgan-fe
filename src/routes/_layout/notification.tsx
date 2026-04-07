import { createFileRoute, getRouteApi } from "@tanstack/react-router";
import { resolveAppRole } from "@/lib/main-menu-list.config";
import { NotificationPage } from "@/views/notification/NotificationPage";

const layoutRoute = getRouteApi("/_layout");

export const Route = createFileRoute("/_layout/notification")({
  component: RouteComponent,
});

function RouteComponent() {
  const user = layoutRoute.useLoaderData();
  const roleName = user?.roles?.[0]?.role_name;
  const role = resolveAppRole(roleName);

  if (role) {
    return <NotificationPage role={role} />;
  }

  return <div className="p-4">Role tidak memiliki akses notifikasi</div>;
}
