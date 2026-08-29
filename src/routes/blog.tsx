import { createFileRoute } from "@tanstack/react-router";
import BlogList from "@/pages/BlogList";

const TITLE = "World Radio Blog – Music Discovery & Country Guides | CartoFM";
const DESCRIPTION =
  "Stories, guides and deep dives on world radio culture, music discovery and country-by-country radio traditions from the CartoFM team.";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://cartofm.com/blog" }],
  }),
  component: BlogList,
});
