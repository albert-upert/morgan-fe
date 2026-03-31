import { createFileRoute } from "@tanstack/react-router";
import { ScanPageView } from "@/views/scan/ScanPage";

export const Route = createFileRoute("/_layout/scan")({
  component: ScanPageView,
});
