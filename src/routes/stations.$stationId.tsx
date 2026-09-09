import { createFileRoute } from "@tanstack/react-router";
import StationPage from "@/pages/StationPage";
import { buildAlternates } from "@/lib/seo-head";

export const Route = createFileRoute("/stations/$stationId")({
  head: ({ params }) => ({
    links: buildAlternates(`/stations/${params.stationId}`, "en"),
  }),
  component: StationPage,
});
