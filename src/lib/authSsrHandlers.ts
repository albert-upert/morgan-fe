import {
  deleteCookie,
  getCookie,
  getRequest,
  setCookie,
} from "@tanstack/react-start/server";
import { COOKIE_NAME, DEV_MOCK_ACCESS_TOKEN } from "./auth.constants";

function getCookieDomain(): string {
  try {
    const request = getRequest();
    return new URL(request.url).hostname;
  } catch {
    return "localhost";
  }
}

function scopedCookieAttrs(): { domain?: string } {
  const host = getCookieDomain();
  if (host === "localhost" || host === "127.0.0.1") {
    return {};
  }
  return { domain: host };
}

const isViteDev = import.meta.env.DEV;
const isDevEnvFlag = import.meta.env.VITE_ENV === "development";

export async function loginHandler(data: {
  username: string;
  password: string;
}) {
  const useMockLogin = isViteDev || isDevEnvFlag;

  if (useMockLogin) {
    const base = {
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax" as const,
    };
    setCookie(COOKIE_NAME, DEV_MOCK_ACCESS_TOKEN, {
      ...scopedCookieAttrs(),
      ...base,
    });
    setCookie("dev_role", data.username, {
      ...scopedCookieAttrs(),
      ...base,
    });
    /** Client mirrors this in `setDevMockSessionCookiesClient` — server Set-Cookie from server-fn responses is unreliable in some dev setups. */
    return { success: true as const, mock: true as const };
  }

  const baseUrl = import.meta.env.VITE_BE_CENTRAL_URL;
  if (!baseUrl) {
    return {
      success: false as const,
      message: "Server misconfigured: VITE_BE_CENTRAL_URL is not set.",
    };
  }

  try {
    const res = await fetch(`${baseUrl}/api/v1/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const text = await res.text();
    let json: Record<string, unknown> = {};
    try {
      json = text ? (JSON.parse(text) as Record<string, unknown>) : {};
    } catch {
      return {
        success: false as const,
        message: res.ok
          ? "Invalid response from login service."
          : `Login failed (${res.status}).`,
      };
    }

    if (!json.success || !json.access_token) {
      return {
        success: false as const,
        message: (json.message as string) || "Login failed",
      };
    }

    setCookie(COOKIE_NAME, json.access_token as string, {
      ...scopedCookieAttrs(),
      path: "/",
      maxAge: (json.expires_in as number) || 3600,
      sameSite: "lax",
    });

    return { success: true as const };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Could not reach login service.";
    return { success: false as const, message };
  }
}

export function logoutHandler() {
  const pathOpts = { path: "/", ...scopedCookieAttrs() };
  deleteCookie(COOKIE_NAME, pathOpts);
  deleteCookie("dev_role", pathOpts);
  return { success: true };
}

export function getTokenCookieHandler(): string | null {
  return getCookie(COOKIE_NAME) || null;
}

/** Same request as SSR `beforeLoad` (not the server-fn RPC context). */
export function getAccessTokenFromIncomingRequest(): string | null {
  try {
    return getCookie(COOKIE_NAME) ?? null;
  } catch {
    return null;
  }
}

export function getDevRoleFromIncomingRequest(): string | undefined {
  try {
    return getCookie("dev_role");
  } catch {
    return undefined;
  }
}
