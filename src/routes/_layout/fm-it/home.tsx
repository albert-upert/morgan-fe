import { createFileRoute, redirect } from "@tanstack/react-router";
import { getUser } from "@/lib/auth";
import { FmitHomePageView } from "@/views/fm-it/FmitHomePageView";

export const Route = createFileRoute("/_layout/fm-it/home")({
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
  component: FmitHomePageView,
});
