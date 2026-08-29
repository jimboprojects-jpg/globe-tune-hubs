import { createFileRoute } from "@tanstack/react-router";
import GenrePage from "@/pages/GenrePage";

const TITLE = "Radio by Genre – Pop, Rock, Jazz, News & More | CartoFM";
const DESCRIPTION =
  "Browse live radio stations by genre. Stream pop, rock, jazz, classical, electronic, hip-hop, news and more from stations around the world on CartoFM.";

export const Route = createFileRoute("/genres/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://cartofm.com/genres" }],
  }),
  component: GenrePage,
});
