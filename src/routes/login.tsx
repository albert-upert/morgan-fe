import { createFileRoute, redirect } from "@tanstack/react-router";
import { getUser } from "@/lib/auth";
import {
  normalizeRedirectSearchParam,
  resolvePostLoginDestination,
} from "@/lib/login-redirect";
import { LoginView } from "@/views/auth/LoginView";

export type LoginSearch = {
  redirect?: string;
};

export const Route = createFileRoute("/login")({
  validateSearch: (raw: Record<string, unknown>): LoginSearch => ({
    redirect: normalizeRedirectSearchParam(raw.redirect),
  }),
  beforeLoad: async ({ context, location, search }) => {
    const user = await getUser(context.queryClient);
    if (user) {
      const roleKey = user.roles?.[0]?.role_name ?? "";
      throw redirect({
        to: resolvePostLoginDestination(
          search.redirect,
          location.href,
          roleKey
        ),
      });
    }
  },
  component: LoginRoutePage,
});

function LoginRoutePage() {
  const { redirect: redirectTo } = Route.useSearch();
  return <LoginView redirectTo={redirectTo} />;
}
