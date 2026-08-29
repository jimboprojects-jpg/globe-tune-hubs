import { createFileRoute } from "@tanstack/react-router";
import CountryPage from "@/pages/CountryPage";

const displayName = (code: string) => {
  try {
    return (
      new Intl.DisplayNames(["en"], { type: "region" }).of(code.toUpperCase()) ??
      code.toUpperCase()
    );
  } catch {
    return code.toUpperCase();
  }
};

export const Route = createFileRoute("/countries/$countryCode")({
  head: ({ params }) => {
    const code = displayName(params.countryCode);
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
