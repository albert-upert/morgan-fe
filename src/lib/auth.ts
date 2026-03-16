import type { QueryClient } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import {
  deleteCookie,
  getCookie,
  getRequest,
  setCookie,
} from "@tanstack/react-start/server";
import { getUsersMeOptions } from "@/services/user/@tanstack/react-query.gen";
import { getTokenSync } from "./cookie";

const COOKIE_NAME = "access_token";

function getCookieDomain(): string {
  try {
    const request = getRequest();
    return new URL(request.url).hostname;
  } catch {
    return "localhost";
  }
}

export const loginFn = createServerFn({ method: "POST" })
  .inputValidator((data: { username: string; password: string }) => data)
  .handler(async ({ data }) => {
    const isDev = import.meta.env.VITE_ENV === "development";

    if (isDev) {
      setCookie(COOKIE_NAME, "test-it-session-01", {
        domain: getCookieDomain(),
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
        sameSite: "lax",
      });
      // Store username as dev role (e.g. "akademik-prodi", "kaprodi", "dekan", "manager-pp")
      setCookie("dev_role", data.username, {
        domain: getCookieDomain(),
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
        sameSite: "lax",
      });
      return { success: true as const };
    }

    const res = await fetch(
      `${import.meta.env.VITE_BE_CENTRAL_URL}/api/v1/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    const json = await res.json();

    if (!json.success || !json.access_token) {
      return {
        success: false as const,
        message: (json.message as string) || "Login failed",
      };
    }

    setCookie(COOKIE_NAME, json.access_token as string, {
      domain: getCookieDomain(),
      path: "/",
      maxAge: (json.expires_in as number) || 3600,
      sameSite: "lax",
    });

    return { success: true as const };
  });

export const logoutFn = createServerFn({ method: "POST" }).handler(() => {
  deleteCookie(COOKIE_NAME, {
    domain: getCookieDomain(),
    path: "/",
  });
  return { success: true };
});

export const getTokenFn = createServerFn({ method: "GET" }).handler(() => {
  const token = getCookie(COOKIE_NAME);
  return token || null;
});

export const getToken = async () => {
  const isServer = typeof window === "undefined";
  return isServer ? await getTokenFn() : (getTokenSync() ?? null);
};

export const getUser = async (queryClient: QueryClient) => {
  const token = await getToken();
  if (!token) return null;

  try {
    const data = await queryClient.fetchQuery({
      ...getUsersMeOptions({
        headers: {
          Cookie: `access_token=${token}`,
        },
      }),
      staleTime: Infinity,
    });
    return data.data ?? null;
  } catch {
    return null;
  }
};
