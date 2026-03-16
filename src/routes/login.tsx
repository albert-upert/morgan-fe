import { createFileRoute, redirect } from "@tanstack/react-router";
import { getUser } from "@/lib/auth";
import { LoginView } from "@/views/auth/LoginView";

export const Route = createFileRoute("/login")({
  beforeLoad: async ({ context }) => {
    const user = await getUser(context.queryClient);
    if (user) {
      throw redirect({ to: "/" });
    }
  },
  component: LoginView,
});
