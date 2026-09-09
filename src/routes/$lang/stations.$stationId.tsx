import { createFileRoute } from "@tanstack/react-router";
import StationPage from "@/pages/StationPage";
import { buildHead } from "@/lib/seo-head";
import { isLang, type Lang } from "@/lib/locale";

export const Route = createFileRoute("/$lang/stations/$stationId")({
  head: ({ params }) =>
    buildHead({
      page: "station",
      lang: (isLang(params.lang) ? params.lang : "en") as Lang,
      path: `/stations/${params.stationId}`,
      name: "Radio",
    }),
  component: StationPage,
});
