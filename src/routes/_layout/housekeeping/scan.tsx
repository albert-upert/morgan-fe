import { createFileRoute } from "@tanstack/react-router";
import { ScanQrView } from "@/views/housekeeping/ScanPage";

export const Route = createFileRoute("/_layout/housekeeping/scan")({
  component: ScanQrView,
});
