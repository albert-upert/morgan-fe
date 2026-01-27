import { createFileRoute } from "@tanstack/react-router";
import { ParticipantsFilledView } from "@/views/auto-assign/ParticipantsFilledView";

export const Route = createFileRoute(
  "/_layout/auto-assign/participants-filled/$classId"
)({
  component: ParticipantsFilledView,
});
