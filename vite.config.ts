/*  eslint-disable import/no-extraneous-dependencies */
/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [react(), dts()],
  // @ts-expect-error -- vitest injects the `test` property; its bundled vite types clash with the top-level vite package
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
  },
  build: {
    lib: {
      entry: "src/index.ts",
      name: "RRuleGenerator",
      fileName: (format) => `rrule-generator.${format}.js`,
    },
    rollupOptions: {
      // eslint-disable-next-line max-len
      external: (id) => /^(react|react-dom|@mui\/material|@mui\/x-date-pickers|@emotion\/react|@emotion\/styled|rrule|zustand|yup|luxon|lodash)(\/?|$)/.test(id),
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "@mui/material": "MaterialUI",
          "@mui/x-date-pickers": "MuiXDatePickers",
          "@emotion/react": "emotionReact",
          "@emotion/styled": "emotionStyled",
          rrule: "rrule",
          zustand: "zustand",
          "zustand/vanilla": "zustandVanilla",
          yup: "yup",
          luxon: "luxon",
          "lodash/isNil": "lodashIsNil",
        },
      },
    },
  },
});
