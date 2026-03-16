const COOKIE_NAME = "access_token";

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
