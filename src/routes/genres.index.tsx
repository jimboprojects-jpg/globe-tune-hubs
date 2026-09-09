import { createFileRoute } from "@tanstack/react-router";
import GenrePage from "@/pages/GenrePage";
import { buildHead } from "@/lib/seo-head";

export const Route = createFileRoute("/genres/")({
  head: () => buildHead({ page: "genres", lang: "en", path: "/genres" }),
  component: GenrePage,
});
