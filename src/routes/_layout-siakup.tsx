import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { useCallback, useMemo, useState } from "react";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { Toaster } from "@/components/toast";
import { getUser } from "@/lib/auth";

export const Route = createFileRoute("/_layout-siakup")({
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
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  const user = useMemo(
    () => ({ name: "John Doe", type: "ADMIN", roles: [] }),
    []
  ); // --- IGNORE ---

  const sidebarWidth = useMemo(
    () => (isCollapsed ? "80px" : "280px"),
    [isCollapsed]
  );

  return (
    <div id="dashboard-layout" className="min-h-screen w-full">
      {/* Fixed Sidebar */}
      <div
        className="fixed top-0 left-0 z-40 hidden h-screen border-r bg-muted/40 md:block"
        style={{ width: sidebarWidth }}
      >
        <Sidebar
          userType={user.type}
          isCollapsed={isCollapsed}
          onToggle={toggleSidebar}
        />
      </div>

      {/* Main content area with padding for fixed sidebar */}
      <div
        className="flex min-h-screen flex-col transition-all duration-300 md:ml-0"
        style={{ marginLeft: `calc(${sidebarWidth} + 0px)` }}
      >
        {/* Fixed Navbar */}
        <div
          className="fixed top-0 right-0 z-30 transition-all duration-300"
          style={{ left: sidebarWidth }}
        >
          <Navbar
            userType={user.type}
            isCollapsed={isCollapsed}
            onToggle={toggleSidebar}
          />
        </div>

        {/* Main content with top padding for fixed navbar */}
        <main className="flex flex-1 flex-col gap-4 bg-muted p-4 pt-[145px] lg:gap-6 lg:p-6 lg:pt-[145px]">
          <Outlet />
        </main>
        <Toaster />
      </div>
    </div>
  );
}
