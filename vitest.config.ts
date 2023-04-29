import { fileURLToPath } from "node:url";
import { mergeConfig } from "vite";
import { configDefaults, defineConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: "jsdom",
      exclude: [...configDefaults.exclude, "e2e/*"],
      coverage: {
        cleanOnRerun: true,
        clean: true,
        reporter: ["html", "json-summary", "json"],
        lines: 80,
        branches: 80,
        functions: 80,
        statements: 80,
      },
      root: fileURLToPath(new URL("./", import.meta.url)),
    },
  })
);
