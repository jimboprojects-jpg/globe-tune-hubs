import { createFileRoute } from "@tanstack/react-router";
import CountryPage from "@/pages/CountryPage";
import { buildHead } from "@/lib/seo-head";
import { isLang, type Lang } from "@/lib/locale";

export const Route = createFileRoute("/$lang/countries/")({
  head: ({ params }) =>
    buildHead({
      page: "countries",
      lang: (isLang(params.lang) ? params.lang : "en") as Lang,
      path: "/countries",
    }),
  component: CountryPage,
});
