const COOKIE_NAME = "access_token";

/** Token dummy dev — harus sama dengan nilai di `loginFn` (auth.ts). */
export const DEV_DUMMY_ACCESS_TOKEN = "test-it-session-01";

/** Setelah `loginFn` sukses di dev: pastikan cookie ada di browser (RPC kadang tidak menerapkan Set-Cookie). */
export function applyDevSessionClient(username: string) {
  if (typeof document === "undefined" || !import.meta.env.DEV) return;
  const maxAge = 60 * 60 * 24 * 7;
  const enc = encodeURIComponent;
  document.cookie = `${COOKIE_NAME}=${enc(DEV_DUMMY_ACCESS_TOKEN)}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
  document.cookie = `dev_role=${enc(username)}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
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

/** Hapus cookie auth di browser (cadangan jika Set-Cookie dari server fn belum ter-apply). */
export function clearAuthCookiesClient() {
  if (typeof document === "undefined") return;
  const host = window.location.hostname;
  const variants: Array<{ path: string; domain?: string }> = [
    { path: "/" },
    { path: "/", domain: host },
  ];
  for (const { path, domain } of variants) {
    const d = domain ? `; domain=${domain}` : "";
    document.cookie = `${COOKIE_NAME}=; Max-Age=0; path=${path}${d}`;
    document.cookie = `dev_role=; Max-Age=0; path=${path}${d}`;
  }
}
