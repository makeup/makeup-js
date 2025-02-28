import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["packages/core/**/test/index.js"],
    globals: true,
    environment: "jsdom",
    coverage: {
      provider: "istanbul",
      reporter: ["text-summary", "lcov", "html"],
      exclude: [
        "node_modules/",
        "packages/**/**/test/",
        "packages/**/**/dist/*",
        "packages/ui/*",
        "**/*.spec.*",
        "docs/",
        "webpack.*",
      ],
    },
  },
});
