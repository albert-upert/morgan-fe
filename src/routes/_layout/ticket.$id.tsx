import { createFileRoute, getRouteApi, redirect } from "@tanstack/react-router";
import { getUser } from "@/lib/auth";
import { resolveAppRole } from "@/lib/main-menu-list.config";
import { TicketDetailView } from "@/views/fm-it/TicketDetailPageView";
import { ReportDetailPageView } from "@/views/lecturer/ReportDetailPageView";

const layoutRouteApi = getRouteApi("/_layout");

export const Route = createFileRoute("/_layout/ticket/$id")({
  beforeLoad: async ({ context }) => {
    const user = await getUser(context.queryClient);
    const role = resolveAppRole(user?.roles?.[0]?.role_name);
    if (role !== "lecturer" && role !== "fm-it") {
      throw redirect({ to: "/", replace: true });
    }
  },
  component: TicketDetailRoute,
});

function TicketDetailRoute() {
  const user = layoutRouteApi.useLoaderData();
  const role = resolveAppRole(user?.roles?.[0]?.role_name);

  if (role === "lecturer") return <ReportDetailPageView />;
  return <TicketDetailView />;
}
