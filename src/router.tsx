import { createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import type { ReactNode } from "react";
import * as TanstackQuery from "./integrations/tanstack-query/root-provider";
import { getToken } from "./lib/auth";
import { routeTree } from "./routeTree.gen";
import { client as centralClient } from "./services/central/client.gen";
import { client as userClient } from "./services/user/client.gen";

const COOKIE_NAME = "access_token";

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

  const isServer = typeof window === "undefined";
  const isDev =
    import.meta.env.DEV || import.meta.env.VITE_ENV === "development";
  const useProxy = !isServer && isDev;

  centralClient.setConfig({
    baseUrl: useProxy ? "/proxy/central" : import.meta.env.VITE_BE_CENTRAL_URL,
  });

  userClient.setConfig({
    baseUrl: useProxy ? "/proxy" : import.meta.env.VITE_BE_URL,
  });

  const requestInterceptor = async (request: Request) => {
    if (isServer) {
      const token = await getToken();
      if (token) {
        request.headers.set("Cookie", `${COOKIE_NAME}=${token}`);
      }
    }
    // On client: requests go through /proxy/* (same origin), browser sends cookie automatically
    return request;
  };

  userClient.interceptors.request.use(requestInterceptor);
  centralClient.interceptors.request.use(requestInterceptor);

  const responseInterceptor = (res: Response) => {
    // if (res.status === 401) {
    //   router.navigate({
    //     to: "/login",
    //     search: {
    //       redirect: window.location.href,
    //     },
    //   });
    // }
    return res;
  };

  userClient.interceptors.response.use(responseInterceptor);
  centralClient.interceptors.response.use(responseInterceptor);

  return router;
};
