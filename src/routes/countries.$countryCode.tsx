import { createFileRoute } from "@tanstack/react-router";
import CountryPage from "@/pages/CountryPage";

export const Route = createFileRoute("/countries/$countryCode")({
  head: ({ params }) => {
    const code = params.countryCode.toUpperCase();
    const title = `${code} Radio Stations – Listen Live Online | CartoFM`;
    const description = `Listen to live radio stations from ${code}. Stream local music, news and talk radio for free on CartoFM's interactive world radio map.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [
        {
          rel: "canonical",
          href: `https://cartofm.com/countries/${params.countryCode}`,
        },
      ],
    };
  },
  component: CountryPage,
});
