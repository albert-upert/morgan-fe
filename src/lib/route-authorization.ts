import type { AppRole } from "@/lib/main-menu-list.config";

const LEGACY_ROLE_PREFIXES = ["/lecturer", "/housekeeping", "/fm-it"];

const ROLE_ALLOWED_PATH_PREFIXES: Record<AppRole, ReadonlyArray<string>> = {
  lecturer: [
    "/",
    "/my-report",
    "/report-detail-page",
    "/room-asset-list",
    "/scan",
    "/notification",
  ],
  "fm-it": ["/", "/ticket-list", "/ticket-detail", "/notification"],
  hk: [
    "/",
    "/checklist-dashboard",
    "/report-history",
    "/room-checklist",
    "/checklist-report",
    "/scan",
    "/notification",
  ],
  supervisor: ["/", "/report-history", "/checklist-report"],
  admin: ["/", "/room-asset-list"],
};

function isLegacyRolePath(pathname: string) {
  return LEGACY_ROLE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

export function canAccessPath(role: AppRole, pathname: string) {
  if (isLegacyRolePath(pathname)) {
    return false;
  }

  const allowedPaths = ROLE_ALLOWED_PATH_PREFIXES[role];
  return allowedPaths.some(
    (allowedPath) =>
      pathname === allowedPath || pathname.startsWith(`${allowedPath}/`)
  );
}
