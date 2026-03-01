import { createFileRoute } from "@tanstack/react-router";
import type React from "react";
import { FmitHomePageView } from "@/views/fm-it/FmitHomePageView";
import { HousekeepingHomePage } from "@/views/housekeeping/HousekeepingHomePage";
import { DosenHomePageView } from "@/views/lecturer/DosenHomePageView";

export const Route = createFileRoute("/_layout/$module/home")({
  component: () => {
    const { module } = Route.useParams();

    const moduleComponentMap: Record<string, React.ComponentType | undefined> =
      {
        lecturer: DosenHomePageView,
        "fm-it": FmitHomePageView,
        housekeeping: HousekeepingHomePage,
      };

    const Component = moduleComponentMap[module];

    if (!Component) {
      return <div>Module not found: {module}</div>;
    }

    return <Component />;
  },
});
