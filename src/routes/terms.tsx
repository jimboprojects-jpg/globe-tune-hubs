import { createFileRoute } from "@tanstack/react-router";
import TermsOfService from "@/pages/TermsOfService";

const TITLE = "Terms of Service – CartoFM World Radio";
const DESCRIPTION =
  "Read CartoFM's Terms of Service. Understand the rules and guidelines for using our free world radio streaming platform.";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://cartofm.com/terms" }],
  }),
  component: TermsOfService,
});
