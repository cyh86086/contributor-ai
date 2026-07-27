import eslint from "@eslint/js";
import globals from "globals";

export default [
  {
    ignores: [
      "coverage/",
      "dist/",
      "node_modules/",
      "scripts/autojs6/d01-jpeg-device-check.js",
    ],
  },
  eslint.configs.recommended,
  {
    files: ["**/*.js", "**/*.mjs"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
      },
    },
    rules: {
      "no-console": ["error", { allow: ["error", "info", "warn"] }],
    },
  },
];
