import { createFileRoute } from "@tanstack/react-router";
import FAQ from "@/pages/FAQ";
import { buildHead } from "@/lib/seo-head";

export const Route = createFileRoute("/faq")({
  head: () => buildHead({ page: "faq", lang: "en", path: "/faq" }),
  component: FAQ,
});
