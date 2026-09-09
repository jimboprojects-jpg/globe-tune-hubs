import { createFileRoute } from "@tanstack/react-router";
import CountryPage from "@/pages/CountryPage";
import { buildHead } from "@/lib/seo-head";
import { isLang, type Lang } from "@/lib/locale";

const displayName = (code: string, lang: string) => {
  try {
    return (
      new Intl.DisplayNames([lang], { type: "region" }).of(code.toUpperCase()) ??
      code.toUpperCase()
    );
  } catch {
    return code.toUpperCase();
  }
};

export const Route = createFileRoute("/$lang/countries/$countryCode")({
  head: ({ params }) => {
    const lang = (isLang(params.lang) ? params.lang : "en") as Lang;
    return buildHead({
      page: "country",
      lang,
      name: displayName(params.countryCode, lang),
      path: `/countries/${params.countryCode}`,
    });
  },
  component: CountryPage,
});
