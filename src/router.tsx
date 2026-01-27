import { createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import type { ReactNode } from "react";
import * as TanstackQuery from "./integrations/tanstack-query/root-provider";

import { clearToken, getTokenSync } from "./lib/auth";

import { routeTree } from "./routeTree.gen";
import { client } from "./services/api/client.gen";

export const getRouter = () => {
  const rqContext = TanstackQuery.getContext();

  const router = createRouter({
    routeTree,
    context: { ...rqContext },
    defaultPreload: "intent",
    Wrap: (props: { children: ReactNode }) => {
      return (
        <TanstackQuery.Provider {...rqContext}>
          {props.children}
        </TanstackQuery.Provider>
      );
    },
  });

  setupRouterSsrQueryIntegration({
    router,
    queryClient: rqContext.queryClient,
  });

  client.setConfig({
    baseUrl: import.meta.env.VITE_BE_URL,
    headers: {
      Authorization: `Bearer ${getTokenSync()}`,
    },
  });
  client.interceptors.response.use((res) => {
    if (res.status === 401) {
      clearToken();
      router.navigate({
        to: "/login",
        search: {
          redirect: window.location.href,
        },
      });
    }
    return res;
  });

  return router;
};
