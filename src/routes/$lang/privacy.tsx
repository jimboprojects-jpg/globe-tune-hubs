import { createFileRoute } from "@tanstack/react-router";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import { buildHead } from "@/lib/seo-head";
import { isLang, type Lang } from "@/lib/locale";

export const Route = createFileRoute("/$lang/privacy")({
  head: ({ params }) =>
    buildHead({
      page: "privacy",
      lang: (isLang(params.lang) ? params.lang : "en") as Lang,
      path: "/privacy",
    }),
  component: PrivacyPolicy,
});
