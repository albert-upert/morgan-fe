import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";
import { getUser } from "@/lib/auth";
import { ChecklistReportView } from "@/views/housekeeping/ChecklistReportPage";

const searchSchema = z.object({
  status: z.enum(["ok", "issue"]).optional(),
});

export const Route = createFileRoute(
  "/_layout/housekeeping/checklist-report/$roomId"
)({
  validateSearch: searchSchema,
  beforeLoad: async ({ location, context }) => {
    const user = await getUser(context.queryClient);
    if (!user) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: ChecklistReportView,
});
