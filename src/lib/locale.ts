import { useNavigate as tsNavigate, useParams } from "@tanstack/react-router";
import { useCallback } from "react";

export const SUPPORTED_LANGS = [
  "en",
  "fr",
  "es",
  "de",
  "sw",
  "zh",
  "ru",
  "hi",
  "ar",
  "pt",
  "id",
] as const;

export type Lang = (typeof SUPPORTED_LANGS)[number];

/** Languages that get their own URL prefix (English lives at the root). */
export const PREFIXED_LANGS = SUPPORTED_LANGS.filter((l) => l !== "en");

export const HREFLANG: Record<Lang, string> = {
  en: "en",
  fr: "fr",
  es: "es",
  de: "de",
  sw: "sw",
  zh: "zh-Hans",
  ru: "ru",
  hi: "hi",
  ar: "ar",
  pt: "pt",
  id: "id",
};

export const RTL_LANGS: string[] = ["ar"];

export const BASE_URL = "https://cartofm.com";

export function isLang(value: string | undefined): value is Lang {
  return !!value && (SUPPORTED_LANGS as readonly string[]).includes(value);
}

/** Removes a leading /xx language segment from a pathname. */
export function stripLocale(pathname: string): string {
  const match = /^\/([a-z]{2})(\/|$)/.exec(pathname);
  if (match && isLang(match[1])) {
    const rest = pathname.slice(3);
    return rest.startsWith("/") ? rest : `/${rest}`;
  }
  return pathname || "/";
}

/** Prefixes an app path with a language segment (English stays unprefixed). */
export function withLocale(path: string, lang: string | undefined): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (!lang || lang === "en" || !isLang(lang)) return clean;
  return clean === "/" ? `/${lang}` : `/${lang}${clean}`;
}

/** Current language segment of the URL, or undefined on English routes. */
export function useLocaleParam(): Lang | undefined {
  const params = useParams({ strict: false }) as { lang?: string };
  return isLang(params.lang) ? params.lang : undefined;
}

/** Navigates to the same page in another language. */
export function useSwitchLanguage() {
  const navigate = tsNavigate();
  return useCallback(
    (code: string, currentPathname: string) => {
      const target = withLocale(stripLocale(currentPathname), code);
      navigate({ to: target as never });
    },
    [navigate],
  );
}
