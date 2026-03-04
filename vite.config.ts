/*  eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [react(), dts()],
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
      external: [
        "react",
        "react-dom",
        "@mui/material",
        "@mui/x-date-pickers",
        "@emotion/react",
        "@emotion/styled",
        "rrule",
        "zustand",
        "zustand/vanilla",
        "yup",
        "luxon",
        "lodash/isNil",
      ],
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
