import type { Config } from "vike/types";
import vikeSolidConfig from "vike-solid/config";
import { onRenderHtml } from "../renderer/+onRenderHtml";
import { renderToStream, renderToString } from "solid-js/web";
import { escapeInject } from "vike/server";

export default {
  // title: "my vike app",
  extends: vikeSolidConfig,
  // ssr: true,
  clientRouting: true,
  onRenderHtml: onRenderHtml,
} satisfies Config;
