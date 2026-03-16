import {
  Outlet,
  createFileRoute,
  redirect,
  useLocation,
} from "@tanstack/react-router";
import { Header } from "@/components/header";
import { getUser } from "@/lib/auth";
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

  return (
    <div
      id="dashboard-layout"
      className="mx-auto min-h-screen w-full max-w-[412px] bg-background"
    >
      {!isScanPage && (
        <>
          {isHomePage ? (
            <div className="fixed top-0 right-0 left-0 z-30 mx-auto max-w-[412px] bg-linear-to-l from-navbar-gradient-end to-background">
              <Header />
            </div>
          ) : (
            <div className="fixed top-0 right-0 left-0 z-30 mx-auto max-w-[412px] border-b border-border">
              <Header />
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
