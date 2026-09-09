import { createFileRoute } from "@tanstack/react-router";
import CountryPage from "@/pages/CountryPage";
import { buildHead } from "@/lib/seo-head";

export const Route = createFileRoute("/countries/")({
  head: () => buildHead({ page: "countries", lang: "en", path: "/countries" }),
  component: CountryPage,
});
