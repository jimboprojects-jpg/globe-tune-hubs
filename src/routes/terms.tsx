import { createFileRoute } from "@tanstack/react-router";
import TermsOfService from "@/pages/TermsOfService";
import { buildHead } from "@/lib/seo-head";

export const Route = createFileRoute("/terms")({
  head: () => buildHead({ page: "terms", lang: "en", path: "/terms" }),
  component: TermsOfService,
});
