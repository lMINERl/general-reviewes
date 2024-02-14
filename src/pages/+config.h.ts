import type { Config } from "vike/types";
import vikeSolidConfig from "vike-solid/config";

export default {
  // title: "my vike app",
  extends: vikeSolidConfig,
  // ssr: true,
  clientRouting: true,
} satisfies Config;
