import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginJest from "eslint-plugin-jest";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}, '**/*.spec.js', '**/*.test.js'"],
    plugins: { jest: pluginJest },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "jest/no-disabled-tests": "warn",
      "jest/no-focused-tests": "error",
      "jest/no-identical-title": "error",
      "jest/prefer-to-have-length": "warn",
      "jest/valid-expect": "error",
    },
  },

  {
    languageOptions: { globals: pluginJest.environments.globals.globals },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];
