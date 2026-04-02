import { useParams } from "@tanstack/react-router";
import { Typography } from "uper-ui/typography";

/**
 * Stub sementara untuk route `/_layout/housekeeping/room-checklist/$id`.
 * File ini sebelumnya tidak ada sehingga routeTree gagal dimuat dan
 * TanStack Router tidak bisa mount (error `__store`).
 */
export function RoomChecklistView() {
  const { id } = useParams({ strict: false });
  const roomId = typeof id === "string" ? id : "";

  return (
    <div className="pt-4 pb-6">
      <Typography variant="h4" className="font-semibold text-gray-900">
        Room Checklist
      </Typography>
      <Typography variant="body-small" className="mt-2 text-gray-700">
        Room ID: {roomId || "-"}
      </Typography>
    </div>
  );
}
