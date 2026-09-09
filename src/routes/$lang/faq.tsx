import { createFileRoute } from "@tanstack/react-router";
import FAQ from "@/pages/FAQ";
import { buildHead } from "@/lib/seo-head";
import { isLang, type Lang } from "@/lib/locale";

export const Route = createFileRoute("/$lang/faq")({
  head: ({ params }) =>
    buildHead({
      page: "faq",
      lang: (isLang(params.lang) ? params.lang : "en") as Lang,
      path: "/faq",
    }),
  component: FAQ,
});
