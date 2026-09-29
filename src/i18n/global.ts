import { routing } from "./routing";
import type ar from "../../messages/ar.json";

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof ar;
  }
}

export {};
