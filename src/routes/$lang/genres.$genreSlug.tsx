import { createFileRoute } from "@tanstack/react-router";
import GenrePage from "@/pages/GenrePage";
import { getGenreBySlug } from "@/data/genreContent";
import { buildHead } from "@/lib/seo-head";
import { isLang, type Lang } from "@/lib/locale";

export const Route = createFileRoute("/$lang/genres/$genreSlug")({
  head: ({ params }) => {
    const genre = getGenreBySlug(params.genreSlug);
    const label =
      genre?.name ??
      params.genreSlug.charAt(0).toUpperCase() + params.genreSlug.slice(1);
    return buildHead({
      page: "genre",
      lang: (isLang(params.lang) ? params.lang : "en") as Lang,
      name: label,
      path: `/genres/${params.genreSlug}`,
    });
  },
  component: GenrePage,
});
