import vi from "./vi";
import en from "./en";

export type { Dictionary } from "./vi";
export type Locale = "vi" | "en";

export const dictionaries = { vi, en };

// URL of the landing page for each language.
export const localePath: Record<Locale, string> = { vi: "/", en: "/en/" };
