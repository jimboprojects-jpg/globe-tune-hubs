import { createFileRoute } from "@tanstack/react-router";
import BlogList from "@/pages/BlogList";
import { buildHead } from "@/lib/seo-head";

export const Route = createFileRoute("/blog/")({
  head: () => buildHead({ page: "blog", lang: "en", path: "/blog" }),
  component: BlogList,
});
