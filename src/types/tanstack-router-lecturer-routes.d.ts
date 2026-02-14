import "@tanstack/react-router";

declare module "@tanstack/react-router" {
  /**
   * TanStack Router file-route types are generated in `src/routeTree.gen.ts`.
   * In this repo ESLint ignores that file, which can cause typed linting to miss
   * lecturer routes and force us to use `as any`.
   *
   * We augment the key unions here so `createFileRoute()` / `navigate({ to })`
   * accept lecturer paths without `any`.
   */
  interface FileRoutesByPath {
    "/_layout/lecturer/home": unknown;
    "/_layout/lecturer/scan": unknown;
    "/_layout/lecturer/room-asset-list/$roomId": unknown;
    "/_layout/lecturer/report-success/$roomId": unknown;
  }

  interface FileRoutesByTo {
    "/lecturer/home": unknown;
    "/lecturer/scan": unknown;
    "/lecturer/room-asset-list/$roomId": unknown;
    "/lecturer/report-success/$roomId": unknown;
  }
}

export {};
