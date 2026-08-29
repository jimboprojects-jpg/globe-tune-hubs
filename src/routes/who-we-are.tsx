import { createFileRoute } from "@tanstack/react-router";
import WhoWeAre from "@/pages/WhoWeAre";

const TITLE = "Who We Are – The Team Behind CartoFM World Radio";
const DESCRIPTION =
  "Learn about CartoFM, the interactive world radio platform connecting listeners to thousands of live stations from every corner of the globe.";

export const Route = createFileRoute("/who-we-are")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://cartofm.com/who-we-are" }],
  }),
  component: WhoWeAre,
});
