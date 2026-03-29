import { createFileRoute } from "@tanstack/react-router";
import { ReportDetailPageView } from "@/views/lecturer/ReportDetailPageView.tsx";
import { ReportSuccessView } from "@/views/lecturer/ReportSuccessView";

type TicketIdSearch = {
  success?: boolean;
};

export const Route = createFileRoute("/_layout/ticket/$id")({
  validateSearch: (raw: Record<string, unknown>): TicketIdSearch => ({
    success: raw.success === true || raw.success === "true",
  }),
  component: TicketIdRoute,
});

function TicketIdRoute() {
  const { success } = Route.useSearch();
  if (success) {
    return <ReportSuccessView />;
  }
  return <ReportDetailPageView />;
}
