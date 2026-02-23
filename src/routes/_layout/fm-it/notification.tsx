import { createFileRoute } from "@tanstack/react-router";
import { FmitNotificationPageView } from "@/views/fm-it/FmitNotificationPageView";

export const Route = createFileRoute("/_layout/fm-it/notification")({
  component: FmitNotificationPageView,
});
