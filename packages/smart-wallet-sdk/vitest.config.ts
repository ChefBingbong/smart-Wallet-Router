import tsconfigPaths from "vitest-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
     // @ts-ignore
     plugins: [tsconfigPaths({})],
     test: {
          environment: "happy-dom",
          globals: true,
          exclude: ["node_modules"],
     },
});
