import {
  Outlet,
  createFileRoute,
  redirect,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";
import { Header } from "@/components/header";
import { getUser, logoutFn } from "@/lib/auth";
import { resolveAppRole } from "@/lib/main-menu-list.config";
import { canAccessPath } from "@/lib/route-authorization";
import type { Me } from "@/services/user/types.gen";

export type LayoutUser = Omit<Me, "metadata"> & {
  metadata?: Record<string, string>;
};

export const Route = createFileRoute("/_layout")({
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

    const roleName = user.roles?.[0]?.role_name;
    const role = resolveAppRole(roleName);

    if (!role || !canAccessPath(role, location.pathname)) {
      throw redirect({
        to: "/",
        replace: true,
      });
    }
  },
  loader: ({ context }) =>
    getUser(context.queryClient) as Promise<LayoutUser | null>,
  component: Layout,
});

function Layout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isHomePage = pathname === "/";
  const isScanPage = pathname.endsWith("/scan");

  const handleLogout = async () => {
    try {
      await logoutFn();
    } finally {
      navigate({
        to: "/login",
        search: { redirect: undefined },
        replace: true,
      });
    }
  };

  return (
    <div
      id="dashboard-layout"
      className="mx-auto min-h-screen w-full max-w-[412px] bg-background"
    >
      {!isScanPage && (
        <>
          {isHomePage ? (
            <div className="fixed top-0 right-0 left-0 z-30 mx-auto max-w-[412px] bg-linear-to-l from-navbar-gradient-end to-background">
              <Header
                onLogoutClick={handleLogout}
                onNotificationClick={() => navigate({ to: "/notification" })}
              />
            </div>
          ) : (
            <div className="fixed top-0 right-0 left-0 z-30 mx-auto max-w-[412px] border-b border-border">
              <Header
                onLogoutClick={handleLogout}
                onNotificationClick={() => navigate({ to: "/notification" })}
              />
            </div>
          )}
        </>
      )}

      <main
        className={
          isScanPage ? "min-h-screen" : "min-h-screen px-[24px] pt-[88px]"
        }
      >
        <Outlet />
      </main>
    </div>
  );
}
