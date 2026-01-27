import { createFileRoute } from "@tanstack/react-router";
import { ParticipantsApprovedView } from "@/views/auto-assign/ParticipantsApprovedView";

export const Route = createFileRoute(
  "/_layout/auto-assign/participants-approved/$classId"
)({
  component: ParticipantsApprovedView,
});
