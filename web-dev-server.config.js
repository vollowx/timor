import { esbuildPlugin } from "@web/dev-server-esbuild";

export default {
  nodeResolve: true,
  watch: true,
  port: 3000,
  rootDir: ".",
  plugins: [esbuildPlugin({ ts: true })],
};
