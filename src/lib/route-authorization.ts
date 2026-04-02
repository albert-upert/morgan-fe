import type { AppRole } from "@/lib/main-menu-list.config";

// Prefix route lama yang sudah di-refactor (harus ditolak)
// Jangan masukkan "/fm-it" di sini karena sekarang kita pakai route baru: "/fm-it/home"
const LEGACY_ROLE_PREFIXES = ["/lecturer", "/housekeeping"];

const ROLE_ALLOWED_PATH_PREFIXES: Record<AppRole, ReadonlyArray<string>> = {
  lecturer: ["/", "/ticket", "/room-asset-list", "/scan"],
  // FM-IT ikut pakai base `/ticket` dan home khusus
  "fm-it": ["/", "/ticket", "/notification", "/fm-it/home"],
  hk: [
    "/",
    "/checklist-dashboard",
    "/report-history",
    "/room-checklist",
    "/checklist-report",
    "/scan",
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
