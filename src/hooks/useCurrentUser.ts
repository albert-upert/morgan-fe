import { getRouteApi } from "@tanstack/react-router";
import { useMemo } from "react";
import { getRoleSync } from "@/lib/cookie";

const layoutRoute = getRouteApi("/_layout");
const isDev = import.meta.env.DEV;

const APPROVER_LABEL: Record<string, string> = {
  "akademik-prodi": "Akademik Prodi",
  kaprodi: "Kaprodi",
  dekan: "Dekan",
  "manager-pp": "Manager PP",
};

export function useCurrentUser() {
  const user = layoutRoute.useLoaderData();

  const userRole = useMemo(() => {
    if (isDev) {
      const devRole = getRoleSync();
      if (devRole) return devRole;
    }
    return user?.roles?.[0]?.role_name ?? "";
  }, [user]);

  const userId = useMemo(() => user?.id ?? null, [user]);
  const userData = {
    ...user,
    metadata: {
      ...user?.metadata,
      full_name: isDev ? APPROVER_LABEL[userRole] : user?.metadata?.full_name,
    } as Record<string, string>,
  };

  return { user: userData, userRole, userId };
}
