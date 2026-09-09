import { createFileRoute } from "@tanstack/react-router";
import GenrePage from "@/pages/GenrePage";
import { buildHead } from "@/lib/seo-head";
import { isLang, type Lang } from "@/lib/locale";

export const Route = createFileRoute("/$lang/genres/")({
  head: ({ params }) =>
    buildHead({
      page: "genres",
      lang: (isLang(params.lang) ? params.lang : "en") as Lang,
      path: "/genres",
    }),
  component: GenrePage,
});
