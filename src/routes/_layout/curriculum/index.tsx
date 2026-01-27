import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/curriculum/")({
  beforeLoad: () => {
    throw redirect({
      to: "/curriculum/$type",
      params: { type: "list" },
    });
  },
});
