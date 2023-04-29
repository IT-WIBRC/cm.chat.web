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
        clean: true,
        reporter: ["html", "json-summary", "json"],
        lines: 90,
        branches: 90,
        functions: 90,
        statements: 90,
        excludeNodeModules: true,
        exclude: [...configDefaults.exclude, "**/services/**", "**/icons/**"],
      },
      root: fileURLToPath(new URL("./", import.meta.url)),
    },
  })
);
