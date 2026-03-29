import { COOKIE_NAME, DEV_MOCK_ACCESS_TOKEN } from "./auth.constants";

const WEEK_SEC = 60 * 60 * 24 * 7;

/**
 * Sets session cookies in the browser for dev mock login. TanStack Start server-fn
 * responses may not persist Set-Cookie before `window.location` navigation; this
 * keeps `getTokenSync` / SSR Cookie header working.
 */
export function setDevMockSessionCookiesClient(username: string) {
  if (typeof window === "undefined") return;
  if (!import.meta.env.DEV && import.meta.env.VITE_ENV !== "development") {
    return;
  }
  const attrs = `path=/;max-age=${WEEK_SEC};SameSite=Lax`;
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(DEV_MOCK_ACCESS_TOKEN)};${attrs}`;
  document.cookie = `dev_role=${encodeURIComponent(username)};${attrs}`;
}

/** Clears session cookies set on the client (dev mock) — server `logoutFn` alone may not remove them. */
export function clearSessionCookiesClient() {
  if (typeof window === "undefined") return;
  const expire = "path=/;max-age=0;SameSite=Lax";
  document.cookie = `${COOKIE_NAME}=;${expire}`;
  document.cookie = `dev_role=;${expire}`;
}

export function getTokenSync() {
  if (typeof window === "undefined") return;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`)
  );
  if (!match?.[1]) return undefined;
  try {
    return decodeURIComponent(match[1]);
  } catch {
    return match[1];
  }
}

export function getRoleSync() {
  if (typeof window === "undefined") return undefined;
  const match = document.cookie.match(/(?:^|; )dev_role=([^;]*)/);
  if (!match?.[1]) return undefined;
  try {
    return decodeURIComponent(match[1]);
  } catch {
    return match[1];
  }
}
