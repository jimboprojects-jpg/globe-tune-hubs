import { createFileRoute } from "@tanstack/react-router";
import WhoWeAre from "@/pages/WhoWeAre";
import { buildHead } from "@/lib/seo-head";
import { isLang, type Lang } from "@/lib/locale";

export const Route = createFileRoute("/$lang/who-we-are")({
  head: ({ params }) =>
    buildHead({
      page: "about",
      lang: (isLang(params.lang) ? params.lang : "en") as Lang,
      path: "/who-we-are",
    }),
  component: WhoWeAre,
});
