import { BASE_URL, HREFLANG, SUPPORTED_LANGS, withLocale, type Lang } from "@/lib/locale";
import { seo, type SeoPage } from "@/i18n/seo";

const OG_LOCALE: Record<Lang, string> = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
  de: "de_DE",
  sw: "sw_KE",
  zh: "zh_CN",
  ru: "ru_RU",
  hi: "hi_IN",
  ar: "ar_AR",
  pt: "pt_PT",
  id: "id_ID",
};

export interface BuildHeadOptions {
  /** Page type used to look up the localized title/description. */
  page: SeoPage;
  /** Language of the current URL. */
  lang: Lang;
  /** Unprefixed app path, e.g. "/countries/FR" or "/". */
  path: string;
  /** Value substituted for {name} in the localized templates. */
  name?: string;
  /** Optional override for the description. */
  description?: string;
  /** Optional override for the title. */
  title?: string;
  ogType?: string;
  ogImage?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const fill = (template: string, name?: string) =>
  name ? template.replaceAll("{name}", name) : template.replaceAll("{name}", "").replace(/\s+/g, " ").trim();

export function buildHead({
  page,
  lang,
  path,
  name,
  title,
  description,
  ogType = "website",
  ogImage = `${BASE_URL}/og-image.png`,
  jsonLd,
}: BuildHeadOptions) {
  const table = seo[lang] ?? seo.en;
  const entry = table[page] ?? seo.en[page];
  const finalTitle = title ?? fill(entry.t, name);
  const finalDescription = description ?? fill(entry.d, name);
  const canonical = `${BASE_URL}${withLocale(path, lang)}`;

  const links: Array<Record<string, string>> = [{ rel: "canonical", href: canonical }];
  for (const code of SUPPORTED_LANGS) {
    links.push({
      rel: "alternate",
      hrefLang: HREFLANG[code],
      href: `${BASE_URL}${withLocale(path, code)}`,
    });
  }
  links.push({ rel: "alternate", hrefLang: "x-default", href: `${BASE_URL}${withLocale(path, "en")}` });

  const meta = [
    { title: finalTitle },
    { name: "description", content: finalDescription },
    { property: "og:title", content: finalTitle },
    { property: "og:description", content: finalDescription },
    { property: "og:type", content: ogType },
    { property: "og:url", content: canonical },
    { property: "og:locale", content: OG_LOCALE[lang] },
    { property: "og:image", content: ogImage },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: finalTitle },
    { name: "twitter:description", content: finalDescription },
    { name: "twitter:image", content: ogImage },
  ];

  const scripts = jsonLd
    ? [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }]
    : undefined;

  return scripts ? { meta, links, scripts } : { meta, links };
}

/** Canonical + hreflang alternates only (pages that set their own title). */
export function buildAlternates(path: string, lang: Lang) {
  const links: Array<Record<string, string>> = [
    { rel: "canonical", href: `${BASE_URL}${withLocale(path, lang)}` },
  ];
  for (const code of SUPPORTED_LANGS) {
    links.push({
      rel: "alternate",
      hrefLang: HREFLANG[code],
      href: `${BASE_URL}${withLocale(path, code)}`,
    });
  }
  links.push({ rel: "alternate", hrefLang: "x-default", href: `${BASE_URL}${path}` });
  return links;
}
