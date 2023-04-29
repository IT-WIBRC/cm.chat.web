import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "9y8uys",
  e2e: {
    specPattern: "cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}",
    baseUrl: "http://localhost:5173",
    chromeWebSecurity: false,
    video: false,
    viewportWidth: 1024,
  },
});
