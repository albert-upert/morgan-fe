import { createFileRoute } from "@tanstack/react-router";
import { DosenHomePageView } from "@/views/lecturer/DosenHomePageView";

export const Route = createFileRoute("/_layout/lecturer/home")({
  component: DosenHomePageView,
});
