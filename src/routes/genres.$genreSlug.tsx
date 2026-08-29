import { createFileRoute } from "@tanstack/react-router";
import GenrePage from "@/pages/GenrePage";
import { getGenreBySlug } from "@/data/genreContent";

export const Route = createFileRoute("/genres/$genreSlug")({
  head: ({ params }) => {
    const genre = getGenreBySlug(params.genreSlug);
    const label =
      genre?.name ??
      params.genreSlug.charAt(0).toUpperCase() + params.genreSlug.slice(1);
    const title = `${label} Radio Stations – Listen Live Free | CartoFM`;
    const description = `Stream live ${label} radio stations from around the world for free. Discover new ${label} broadcasts on CartoFM's interactive radio globe.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [
        {
          rel: "canonical",
          href: `https://cartofm.com/genres/${params.genreSlug}`,
        },
      ],
    };
  },
  component: GenrePage,
});
