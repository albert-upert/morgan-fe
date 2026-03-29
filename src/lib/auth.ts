import type { QueryClient } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { getUsersMeOptions } from "@/services/user/@tanstack/react-query.gen";
import type { Me } from "@/services/user/types.gen";
import { COOKIE_NAME, DEV_MOCK_ACCESS_TOKEN } from "./auth.constants";
import { getRoleSync, getTokenSync } from "./cookie";

export { COOKIE_NAME, DEV_MOCK_ACCESS_TOKEN };

/** `vite dev` or explicit VITE_ENV=development in .env */
const isViteDev = import.meta.env.DEV;
const isDevEnvFlag = import.meta.env.VITE_ENV === "development";

export const loginFn = createServerFn({ method: "POST" })
  .inputValidator((data: { username: string; password: string }) => data)
  .handler(async ({ data }) => {
    const { loginHandler } = await import("./authSsrHandlers");
    return loginHandler(data);
  });

export const logoutFn = createServerFn({ method: "POST" }).handler(async () => {
  const { logoutHandler } = await import("./authSsrHandlers");
  return logoutHandler();
});

export const getTokenFn = createServerFn({ method: "GET" }).handler(
  async () => {
    const { getTokenCookieHandler } = await import("./authSsrHandlers");
    return getTokenCookieHandler();
  }
);

export const getToken = async () => {
  if (typeof window === "undefined") {
    try {
      const { getAccessTokenFromIncomingRequest } =
        await import("./authSsrHandlers");
      const fromRequest = getAccessTokenFromIncomingRequest();
      if (fromRequest) return fromRequest;
    } catch {
      /* not in a Start request context */
    }
    return (await getTokenFn()) ?? null;
  }
  return getTokenSync() ?? (await getTokenFn());
};

function isDevMockSession(token: string): boolean {
  return (isViteDev || isDevEnvFlag) && token === DEV_MOCK_ACCESS_TOKEN;
}

async function buildDevMockUser(): Promise<Me> {
  let roleName = "dosen";
  if (typeof window !== "undefined") {
    roleName = getRoleSync() ?? "dosen";
  } else {
    try {
      const { getDevRoleFromIncomingRequest } =
        await import("./authSsrHandlers");
      roleName = getDevRoleFromIncomingRequest() ?? "dosen";
    } catch {
      roleName = "dosen";
    }
  }
  return {
    id: "dev-mock-user",
    status: "active",
    metadata: { full_name: "Dev User" },
    roles: [{ role_name: roleName }],
  };
}

export const getUser = async (queryClient: QueryClient) => {
  const token = await getToken();
  if (!token) return null;

  if (isDevMockSession(token)) {
    return buildDevMockUser();
  }

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
