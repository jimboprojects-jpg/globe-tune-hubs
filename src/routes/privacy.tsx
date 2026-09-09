import { createFileRoute } from "@tanstack/react-router";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import { buildHead } from "@/lib/seo-head";

export const Route = createFileRoute("/privacy")({
  head: () => buildHead({ page: "privacy", lang: "en", path: "/privacy" }),
  component: PrivacyPolicy,
});
