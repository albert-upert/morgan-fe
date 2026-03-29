import {
  Outlet,
  createFileRoute,
  redirect,
  useLocation,
} from "@tanstack/react-router";
import { useCallback } from "react";
import { Header } from "@/components/header";
import { getUser, logoutFn } from "@/lib/auth";
import { clearSessionCookiesClient } from "@/lib/cookie";
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
  },
  loader: ({ context }) =>
    getUser(context.queryClient) as Promise<LayoutUser | null>,
  component: Layout,
});

function Layout() {
  const { pathname } = useLocation();
  const isHomePage = pathname.endsWith("/home");
  const isScanPage = pathname.endsWith("/scan");

  const handleLogout = useCallback(() => {
    // Fire-and-forget: dropdown `onSelect` may not await async; defer full flow.
    void (async () => {
      try {
        await logoutFn();
      } catch {
        /* server fn may fail; still clear client cookies and leave */
      }
      clearSessionCookiesClient();
      window.location.assign("/login");
    })();
  }, []);

  return (
    <div
      id="dashboard-layout"
      className="mx-auto min-h-screen w-full max-w-[412px] bg-background"
    >
      {!isScanPage && (
        <>
          {isHomePage ? (
            <div className="fixed top-0 right-0 left-0 z-30 mx-auto max-w-[412px] bg-linear-to-l from-navbar-gradient-end to-background">
              <Header onLogoutClick={handleLogout} />
            </div>
          ) : (
            <div className="fixed top-0 right-0 left-0 z-30 mx-auto max-w-[412px] border-b border-border">
              <Header onLogoutClick={handleLogout} />
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
