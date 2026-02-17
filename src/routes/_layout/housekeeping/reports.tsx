import { createFileRoute, redirect } from "@tanstack/react-router";
import { getUser } from "@/lib/auth";
import { ReportHistoryPage } from "@/views/housekeeping/ReportHistoryPage";

export const Route = createFileRoute("/_layout/housekeeping/reports")({
  beforeLoad: async ({ location, context }) => {
    const user = await getUser(context.queryClient);
    if (!user) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: ReportHistoryPage,
});
