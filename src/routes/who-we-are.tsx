import { createFileRoute } from "@tanstack/react-router";
import WhoWeAre from "@/pages/WhoWeAre";
import { buildHead } from "@/lib/seo-head";

export const Route = createFileRoute("/who-we-are")({
  head: () => buildHead({ page: "about", lang: "en", path: "/who-we-are" }),
  component: WhoWeAre,
});
