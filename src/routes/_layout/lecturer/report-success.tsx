import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/lecturer/report-success")({
  beforeLoad: ({ location }) => {
    // Only redirect when user is exactly on /lecturer/report-success (not the $roomId child route)
    if (location.pathname !== "/lecturer/report-success") return;

    throw redirect({
      to: "/lecturer/report-success/$roomId",
      params: { roomId: "0001" },
      replace: true,
    });
  },
  component: Outlet,
});
