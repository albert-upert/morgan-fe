import {
  Outlet,
  createFileRoute,
  getRouteApi,
  redirect,
  useRouterState,
} from "@tanstack/react-router";
import { getUser } from "@/lib/auth";
import { resolveAppRole } from "@/lib/main-menu-list.config";
import { TicketListView } from "@/views/fm-it/TicketListPageView";
import { MyReportView } from "@/views/lecturer/MyReportView";

const layoutRouteApi = getRouteApi("/_layout");

export const Route = createFileRoute("/_layout/ticket")({
  beforeLoad: async ({ context }) => {
    const user = await getUser(context.queryClient);
    const role = resolveAppRole(user?.roles?.[0]?.role_name);
    if (role !== "lecturer" && role !== "fm-it") {
      throw redirect({ to: "/", replace: true });
    }
  },
  component: TicketRouteIndex,
});

function TicketRouteIndex() {
  const isTicketDetail = useRouterState({
    select: (s) => {
      const segs = s.location.pathname.split("/").filter(Boolean);
      return segs[0] === "ticket" && segs.length >= 2;
    },
  });

  if (isTicketDetail) {
    return <Outlet />;
  }

  const user = layoutRouteApi.useLoaderData();
  const role = resolveAppRole(user?.roles?.[0]?.role_name);
  if (role === "fm-it") return <TicketListView />;
  return <MyReportView />;
}
