import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/configuration/academic/")({
  beforeLoad: () => {
    throw redirect({
      to: "/configuration/academic/$type",
      params: { type: "period" },
    });
  },
});
