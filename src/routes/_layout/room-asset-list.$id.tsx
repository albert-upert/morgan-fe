import { createFileRoute, redirect } from "@tanstack/react-router";
import { getUser } from "@/lib/auth";
import { LecturerRoomChecklistPage } from "@/views/checklist/LecturerRoomChecklistPage";

export const Route = createFileRoute("/_layout/room-asset-list/$id")({
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
  component: LecturerRoomChecklistPage,
});
