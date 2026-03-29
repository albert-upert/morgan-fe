import { createFileRoute } from "@tanstack/react-router";
import { ChecklistDashboardView } from "@/views/housekeeping/ChecklistDashboardPage";
import { DosenHomePageView } from "@/views/lecturer/DosenHomePageView";

export const Route = createFileRoute("/_layout/$module/home")({
  component: ModuleHomePage,
});

function ModuleHomePage() {
  const { module } = Route.useParams();
  if (module === "housekeeping") {
    return <ChecklistDashboardView />;
  }
  return <DosenHomePageView />;
}
