import { createFileRoute } from "@tanstack/react-router";
import StationPage from "@/pages/StationPage";

export const Route = createFileRoute("/stations/$stationId")({
  head: ({ params }) => ({
    links: [
      { rel: "canonical", href: `https://cartofm.com/stations/${params.stationId}` },
    ],
  }),
  component: StationPage,
});
