import { createFileRoute, redirect } from "@tanstack/react-router";
import { getUser } from "@/lib/auth";
import { ScanQrView } from "@/views/lecturer/ScanQrView";

export const Route = createFileRoute("/_layout/lecturer/scan")({
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
  component: ScanQrView,
});
