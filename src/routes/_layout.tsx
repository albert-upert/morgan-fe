import {
  Outlet,
  createFileRoute,
  redirect,
  useLocation,
} from "@tanstack/react-router";
// import { Header } from "uper-ui";
import { Header } from "@/components/header/Header";
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
  const isScanPage = pathname.endsWith("/scan");

  return (
    <div
      id="dashboard-layout"
      className="mx-auto min-h-screen w-full max-w-[412px] bg-background"
    >
      {!isScanPage && (
        <>
          <div className="fixed top-0 right-0 left-0 z-30 mx-auto max-w-[412px] border-b border-border">
            <Header />
          </div>
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
