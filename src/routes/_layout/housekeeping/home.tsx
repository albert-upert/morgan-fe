import { createFileRoute } from "@tanstack/react-router";
import { HousekeepingHomePage } from "@/views/housekeeping/HousekeepingHomePage";

export const Route = createFileRoute("/_layout/housekeeping/home")({
  component: HousekeepingHomePage,
});
