import { createFileRoute } from "@tanstack/react-router";
import { ScanPageView } from "@/views/housekeeping/ScanPage";

export const Route = createFileRoute("/_layout/scan/")({
  component: ScanPageView,
});
