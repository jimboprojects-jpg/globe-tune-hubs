import { createFileRoute } from "@tanstack/react-router";
import PrivacyPolicy from "@/pages/PrivacyPolicy";

const TITLE = "Privacy Policy – CartoFM World Radio";
const DESCRIPTION =
  "CartoFM's Privacy Policy. Learn how we handle your data — no personal information collected, no tracking cookies.";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://cartofm.com/privacy" }],
  }),
  component: PrivacyPolicy,
});
