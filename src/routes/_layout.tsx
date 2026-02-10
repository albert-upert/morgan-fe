import {
  Outlet,
  createFileRoute,
  redirect,
  useLocation,
} from "@tanstack/react-router";
import { NotificationIcon, ProfileIcon, SettingIcon } from "uper-ui/icon";
import { Typography } from "uper-ui/typography";
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
  const fullName = "Agus Bagus";
  const subtitle = "Janitor - Universitas Pertamina";

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
              <div className="mx-[24px] border-b border-border" />
              <div className="mx-auto flex max-w-[412px] items-center justify-between border-b border-border px-[24px] py-[16px]">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    <ProfileIcon className="h-6 w-6 text-blue-500" />
                  </div>
                  <div className="flex flex-col">
                    <Typography
                      variant="body-medium-bold"
                      className="text-gray-800"
                    >
                      {fullName}
                    </Typography>
                    <Typography variant="pixie" className="text-gray-800">
                      ({subtitle})
                    </Typography>
                  </div>
                </div>

                <div className="flex items-center gap-[8px]">
                  <button
                    type="button"
                    className="rounded-full text-black"
                    aria-label="Notifikasi"
                  >
                    <NotificationIcon className="h-[32px] w-[32px]" />
                  </button>
                  <button
                    type="button"
                    className="rounded-full text-black"
                    aria-label="Pengaturan"
                  >
                    <SettingIcon className="h-[32px] w-[32px]" />
                  </button>
                </div>
              </div>
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
