import { createFileRoute } from "@tanstack/react-router";
import Index from "@/pages/Index";
import { buildHead } from "@/lib/seo-head";

export const Route = createFileRoute("/")({
  head: () => buildHead({ page: "home", lang: "en", path: "/" }),
  component: Index,
});
