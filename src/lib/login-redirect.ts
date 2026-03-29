const isDevApp =
  import.meta.env.DEV || import.meta.env.VITE_ENV === "development";

/**
 * When `?redirect=/` (or missing), mock test users should land on their module
 * home — not `/`, which is a generic dashboard and often loops back to login UX.
 */
const TEST_USER_DEFAULT_HOME: Record<string, string> = {
  dosen: "/lecturer/home",
  "fm-it": "/fm-it/home",
  "house-keeping": "/housekeeping/home",
  supervisor: "/lecturer/home",
  admin: "/lecturer/home",
};

/** Normalize `redirect` from the query string (decode `%2F...`, handle repeated keys). */
export function normalizeRedirectSearchParam(
  value: unknown
): string | undefined {
  const s =
    typeof value === "string"
      ? value
      : Array.isArray(value) && typeof value[0] === "string"
        ? value[0]
        : undefined;
  if (s == null || !String(s).trim()) return undefined;
  try {
    return decodeURIComponent(String(s).trim());
  } catch {
    return String(s).trim();
  }
}

/** Same-origin only; allows `/path` or full URL on the current host. */
export function safePostLoginPath(
  raw: string | undefined,
  currentHref: string
): string {
  const decoded = normalizeRedirectSearchParam(raw);
  if (!decoded) return "/";
  if (decoded.startsWith("/") && !decoded.startsWith("//")) return decoded;
  try {
    const target = new URL(decoded);
    const origin = new URL(currentHref).origin;
    if (target.origin === origin) {
      return `${target.pathname}${target.search}${target.hash}`;
    }
  } catch {
    /* invalid URL */
  }
  return "/";
}

/**
 * After login: resolve `redirect` search param, then in dev map test users from
 * `/` to their module home (e.g. dosen → `/lecturer/home`).
 */
export function resolvePostLoginDestination(
  redirectTo: string | undefined,
  currentHref: string,
  loggedInUsername: string
): string {
  const path = safePostLoginPath(redirectTo, currentHref);
  if (isDevApp && path === "/" && loggedInUsername in TEST_USER_DEFAULT_HOME) {
    return TEST_USER_DEFAULT_HOME[loggedInUsername];
  }
  return path;
}
