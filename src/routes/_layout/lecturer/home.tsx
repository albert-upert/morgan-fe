import { createFileRoute, redirect } from "@tanstack/react-router";
import { getUser } from "@/lib/auth";
import { DosenHomePageView } from "@/views/lecturer/DosenHomePageView";

export const Route = createFileRoute("/_layout/lecturer/home")({
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
  component: DosenHomePageView,
});
