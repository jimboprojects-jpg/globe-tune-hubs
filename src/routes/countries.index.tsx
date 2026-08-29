import { createFileRoute } from "@tanstack/react-router";
import CountryPage from "@/pages/CountryPage";

const TITLE = "Radio by Country – Browse Live Stations Worldwide | CartoFM";
const DESCRIPTION =
  "Browse live radio stations by country. Explore thousands of FM, AM and internet radio streams from every nation on the CartoFM interactive directory.";

export const Route = createFileRoute("/countries/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://cartofm.com/countries" }],
  }),
  component: CountryPage,
});
