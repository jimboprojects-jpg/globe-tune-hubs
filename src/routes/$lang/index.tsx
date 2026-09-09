import { createFileRoute } from "@tanstack/react-router";
import Index from "@/pages/Index";
import { buildHead } from "@/lib/seo-head";
import { isLang, type Lang } from "@/lib/locale";

export const Route = createFileRoute("/$lang/")({
  head: ({ params }) =>
    buildHead({
      page: "home",
      lang: (isLang(params.lang) ? params.lang : "en") as Lang,
      path: "/",
    }),
  component: Index,
});
