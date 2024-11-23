import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";


/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  {
    settings: {
      react: {
        version: "detect", // Automatically detect React version
      },
    },
  },
  {
    "rules": {
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off"
    }
  },
];