import { defineConfig, loadEnv } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import viteTsConfigPaths from "vite-tsconfig-paths";

const config = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const devProxy = {
    "/proxy/central": {
      target: env.VITE_BE_CENTRAL_URL,
      changeOrigin: true,
      rewrite: (path: string) => path.replace(/^\/proxy\/central/, ""),
    },
    "/proxy": {
      target: env.VITE_BE_URL,
      changeOrigin: true,
      rewrite: (path: string) => path.replace(/^\/proxy\//, ""),
    },
  };

  const isViteDev = mode === "development";

  return {
    plugins: [
      // this is the plugin that enables path aliases
      viteTsConfigPaths({
        projects: ["./tsconfig.json"],
      }),
      tanstackStart(),
      viteReact(),
    ],
    resolve: {
      dedupe: ["@tanstack/react-router"],
    },
    ssr: {
      noExternal: ["uper-ui"],
    },
    server: {
      allowedHosts: true,
      ...(isViteDev && { proxy: devProxy }),
    },
  };
});

export default config;
