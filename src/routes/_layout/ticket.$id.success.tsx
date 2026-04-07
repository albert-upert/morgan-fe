import { createFileRoute, redirect } from "@tanstack/react-router";
import { getUser } from "@/lib/auth";
import { resolveAppRole } from "@/lib/main-menu-list.config";
import { ReportSuccessView } from "@/views/lecturer/ReportSuccessView";

export const Route = createFileRoute("/_layout/ticket/$id/success")({
  beforeLoad: async ({ context }) => {
    const user = await getUser(context.queryClient);
    const role = resolveAppRole(user?.roles?.[0]?.role_name);
    if (role !== "lecturer") {
      throw redirect({ to: "/", replace: true });
    }
  },
  component: ReportSuccessView,
});
