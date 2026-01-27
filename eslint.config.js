// @ts-check
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import { tanstackConfig } from "@tanstack/eslint-config";
import noRelativeImportPaths from "eslint-plugin-no-relative-import-paths";

export default [
  ...tanstackConfig,
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      "no-relative-import-paths": noRelativeImportPaths,
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
        },
      },
    },
    rules: {
      "no-relative-import-paths/no-relative-import-paths": [
        "error",
        { allowSameFolder: true, rootDir: "src", prefix: "@" },
      ],
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling", "index"],
          ],
          pathGroups: [
            {
              pattern: "@/**",
              group: "internal",
              position: "before",
            },
          ],
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "no-unused-vars": "off", // Turn off base rule as it can report incorrect errors
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
  {
    ignores: [
      "**/dist/**",
      "**/build/**",
      "**/.storybook-static/**",
      "**/storybook-static/**",
      "**/node_modules/**",
      "**/*.gen.ts",
      "**/routeTree.gen.ts",
      "pnpm-lock.yaml",
      "package-lock.json",
      "yarn.lock",
      ".storybook/**",
      "*.config.js",
      "*.config.ts",
    ],
  },
];
