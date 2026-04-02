import { Outlet, createFileRoute, useParams } from "@tanstack/react-router";
import { MyReportView } from "@/views/lecturer/MyReportView";

export const Route = createFileRoute("/_layout/ticket")({
  component: TicketLayout,
});

function TicketLayout() {
  // Kalau sedang di route `/ticket/$id`, param `id` ada.
  // Maka list harus disembunyikan supaya yang tampil detail.
  const { id } = useParams({ strict: false });
  const ticketId = typeof id === "string" ? id : undefined;
  const showList = !ticketId;

  return (
    <>
      {showList ? <MyReportView /> : null}
      <Outlet />
    </>
  );
}
