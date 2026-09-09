import { createFileRoute } from "@tanstack/react-router";
import CountryPage from "@/pages/CountryPage";
import { buildHead } from "@/lib/seo-head";

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
  head: ({ params }) =>
    buildHead({
      page: "country",
      lang: "en",
      name: displayName(params.countryCode),
      path: `/countries/${params.countryCode}`,
    }),
  component: CountryPage,
});
