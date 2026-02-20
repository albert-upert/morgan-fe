import { createFileRoute } from "@tanstack/react-router";
import { ScanQrView } from "@/views/lecturer/ScanQrView";

export const Route = createFileRoute("/_layout/lecturer/scan")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ScanQrView />;
}
