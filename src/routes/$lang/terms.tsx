import { createFileRoute } from "@tanstack/react-router";
import TermsOfService from "@/pages/TermsOfService";
import { buildHead } from "@/lib/seo-head";
import { isLang, type Lang } from "@/lib/locale";

export const Route = createFileRoute("/$lang/terms")({
  head: ({ params }) =>
    buildHead({
      page: "terms",
      lang: (isLang(params.lang) ? params.lang : "en") as Lang,
      path: "/terms",
    }),
  component: TermsOfService,
});
