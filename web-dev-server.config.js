import { fileURLToPath } from "url";
import { esbuildPlugin } from "@web/dev-server-esbuild";

export default {
  nodeResolve: { exportConditions: ["development"] },
  preserveSymlinks: true,
  watch: true,
  port: 3000,
  plugins: [
    esbuildPlugin({
      ts: true,
      tsconfig: fileURLToPath(new URL("./tsconfig.json", import.meta.url)),
    }),
  ],
};
