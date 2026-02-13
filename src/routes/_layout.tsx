import {
  Outlet,
  createFileRoute,
  redirect,
  useLocation,
} from "@tanstack/react-router";
import { Separator } from "uper-ui/separator";
import { Header } from "@/components/header";
import { getUser } from "@/lib/auth";

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
  component: Layout,
});

function Layout() {
  const { pathname } = useLocation();
  const isHomePage = pathname.endsWith("/home");
  const isScanPage = pathname.endsWith("/scan");

  return (
    <div
      id="dashboard-layout"
      className="max-w-auto mx-auto min-h-screen w-full bg-background"
    >
      {!isScanPage && (
        <>
          {isHomePage ? (
            <div className="max-w-auto fixed top-0 right-0 left-0 z-30 mx-auto bg-linear-to-l from-navbar-gradient-end to-background">
              <Header />
              <Separator/>
            </div>
          ) : (
            <div className="max-w-auto fixed top-0 right-0 left-0 z-30 mx-auto border-b border-border">
              <Header />
            </div>
          )}
        </>
      )}

      <main
        className={
          isScanPage ? "min-h-screen" : "min-h-screen px-[24px] pt-[104px]"
        }
      >
        <Outlet />
      </main>
    </div>
  );
}
