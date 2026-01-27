import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "https://petstore.swagger.io/v2/swagger.json",
  output: "src/services/api",
  plugins: [
    {
      name: "@tanstack/react-query",
      queryOptions: true,
    },
  ],
});
