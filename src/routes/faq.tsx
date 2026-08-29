import { createFileRoute } from "@tanstack/react-router";
import FAQ from "@/pages/FAQ";

const TITLE = "CartoFM FAQ – How Online World Radio Streaming Works";
const DESCRIPTION =
  "Answers to common questions about CartoFM: how the radio globe works, stream quality, favorites, supported languages and listening for free worldwide.";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://cartofm.com/faq" }],
  }),
  component: FAQ,
});
