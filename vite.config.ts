import { UserConfigFnObject, defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import VikeSolid from "vike-solid/vite";
import vike, { UserConfig } from "vike/plugin";
import crypto from "crypto-js";
import devtools from "solid-devtools/vite";
import csp from "vite-plugin-csp";
export default defineConfig(({ mode }) => {
  // something
  const viteClientRegex = /node_modules\/vite\/dist\/client\/client\.mjs$/gi;
  // regex'es to add CSP

  let currentNonce = "";

  const m = () => { 
    const salt = crypto.lib.WordArray.random(128 / 8).toString();
    currentNonce = salt;
    return currentNonce;
  };

  const StyleNonce = mode === "development" ? m() : "{SERVER-GENERATED-NONCE}";

  const regexMeta = /<meta csp(.*?)/gi;
  const replacementMeta = (scriptNonce: string, styleNonce: string) =>
    `<meta content="default-src 'self'; base-uri 'self'; script-src 'self' 'nonce-${scriptNonce}' 'unsafe-inline'; style-src 'self' 'nonce-${styleNonce}' 'unsafe-inline'" `;

  // TODO: make one normal regex to handle all three
  const regexScript = /<script(.*?)/gi;
  const replacementScript = (nonce: string) => `<script nonce="${nonce}"$1`;

  const regexStyle = /<style(.*?)/gi;
  const replacementStyle = (nonce: string) => `<style nonce="${nonce}"$1`;

  const regexLink = /<link(.*?)/gi;
  const replacementLink = (nonce: string) => `<link nonce="${nonce}"$1`;

  const regexCssLink = /<link css(.*?)/gi;
  const replacementCssLink = (nonce: string) => `<link nonce="${nonce}"$1`;

  return {
    plugins: [
      /* 
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
      devtools({
        autoname: true,
      }),
      // vike(),
      // VikeSolid(),
      solidPlugin({ ssr: true }),
      // csp({
      //   enabled: true,
      //   policy: { "script-src": "nonce-1234" },
      //   onDev: "full",
      //   inject: true,
      //   nonceEnabled: { "script-src": true, "style-src": false },
      //
      // }),
      {
        name: "transform-file",

        transform(src, id) {
          if (viteClientRegex.test(id)) {
            return {
              code: src.replace(
                "style.setAttribute('data-vite-dev-id', id);",
                `style.setAttribute('data-vite-dev-id', id); style.setAttribute('nonce', '${StyleNonce}');`,
              ),
            };
          }
        },
      },
      {
        name: "html-inject-nonce-into-script-tag",
        enforce: "post",
        transformIndexHtml(html) {
          const cn = m();
          return html
            .replace(regexScript, replacementScript(cn))
            .replace(regexStyle, replacementStyle(StyleNonce))
            .replace(regexCssLink, replacementCssLink(StyleNonce))
            .replace(regexLink, replacementLink(cn))
            .replace(regexMeta, replacementMeta(cn, StyleNonce));
        },
      },

      // solidPlugin(),
    ],
    server: {
      port: 3000,
    },
    build: {
      target: "esnext",
    },
  };
});
