import { createFileRoute } from "@tanstack/react-router";
import { FmitHomePageView } from "@/views/fm-it/FmitHomePageView";

export const Route = createFileRoute("/_layout/fm-it/home")({
  component: FmitHomePageView,
});
