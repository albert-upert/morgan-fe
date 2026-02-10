import { createFileRoute, redirect } from "@tanstack/react-router";
import { getUser } from "@/lib/auth";
import { ReportSuccessView } from "@/views/lecturer/ReportSuccessView";

export const Route = createFileRoute(
  "/_layout/lecturer/report-success/$roomId"
)({
  beforeLoad: async ({ location, context, params }) => {
    const user = await getUser(context.queryClient);
    if (!user) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }

    // If user opens a URL with a hash (legacy), normalize to a clean URL (no hash)
    if (location.hash) {
      throw redirect({
        to: "/lecturer/report-success/$roomId",
        params,
        replace: true,
      });
    }
  },
  component: ReportSuccessView,
});
