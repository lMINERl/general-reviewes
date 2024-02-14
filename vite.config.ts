import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import csp from "vite-plugin-csp";

import VikeSolid from "vike-solid/vite";
import vike from "vike/plugin";

import devtools from "solid-devtools/vite";

export default defineConfig({
  plugins: [
    csp({
      policy: {
        "upgrade-insecure-requests": true,
        "script-src": ["self", "unsafe-inline"],
        sandbox: "allow-scripts",
        "style-src": ["self", "unsafe-inline"],
      },
      enabled: true,
      inject: true,
      hashEnabled: {
        "script-src": true,
        "style-src": true,
        "script-src-attr": true,
        "style-src-attr": true,
      },
    }),
    /* 
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
    devtools({
      autoname: true,
    }),
    vike(),
    VikeSolid(),
    // solidPlugin(),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
  },
});
