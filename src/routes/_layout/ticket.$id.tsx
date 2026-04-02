import { createFileRoute } from "@tanstack/react-router";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { ReportDetailPageView } from "@/views/lecturer/ReportDetailPageView";
import { ReportSuccessView } from "@/views/lecturer/ReportSuccessView";

export const Route = createFileRoute("/_layout/ticket/$id")({
  validateSearch: (
    search: Record<string, unknown>
  ): { submitted?: boolean } => {
    const submitted =
      search.submitted === true ||
      search.submitted === "true" ||
      search.submitted === 1 ||
      search.submitted === "1";

    // Agar URL tidak menampilkan `?submitted=false`, hanya set kalau true.
    return submitted ? { submitted: true } : { submitted: undefined };
  },
  component: LecturerTicketIdPage,
});

function LecturerTicketIdPage() {
  const { userRole } = useCurrentUser();
  const { submitted } = Route.useSearch();

  if (userRole === "fm-it") {
    return <ReportDetailPageView />;
  }

  if (submitted === true) {
    return <ReportSuccessView />;
  }

  return <ReportDetailPageView />;
}
