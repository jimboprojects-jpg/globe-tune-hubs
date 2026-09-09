import { createFileRoute } from "@tanstack/react-router";
import BlogList from "@/pages/BlogList";
import { buildHead } from "@/lib/seo-head";
import { isLang, type Lang } from "@/lib/locale";

export const Route = createFileRoute("/$lang/blog/")({
  head: ({ params }) =>
    buildHead({
      page: "blog",
      lang: (isLang(params.lang) ? params.lang : "en") as Lang,
      path: "/blog",
    }),
  component: BlogList,
});
