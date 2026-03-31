import { createFileRoute, redirect } from "@tanstack/react-router";
import { getUser } from "@/lib/auth";
import { LoginView } from "@/views/auth/LoginView";

export const Route = createFileRoute("/login")({
  validateSearch: (search: Record<string, unknown>) => ({
    redirect: typeof search.redirect === "string" ? search.redirect : undefined,
  }),
  beforeLoad: async ({ context }) => {
    const user = await getUser(context.queryClient);
    if (user) {
      throw redirect({ to: "/" });
    }
  },
  component: LoginView,
});
