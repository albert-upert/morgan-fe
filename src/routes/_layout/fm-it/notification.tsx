import { createFileRoute } from "@tanstack/react-router";
import { FmitNotificationPageView } from "@/views/notification/FmitNotificationPage";

export const Route = createFileRoute("/_layout/fm-it/notification")({
  component: FmitNotificationPageView,
});
