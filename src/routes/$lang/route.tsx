import { useEffect } from "react";
import { createFileRoute, notFound, redirect, Outlet } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { isLang, RTL_LANGS } from "@/lib/locale";

export const Route = createFileRoute("/$lang")({
  beforeLoad: ({ params, location }) => {
    if (params.lang === "en") {
      const rest = location.pathname.slice(3) || "/";
      throw redirect({ to: (rest.startsWith("/") ? rest : `/${rest}`) as never, replace: true });
    }
    if (!isLang(params.lang)) throw notFound();
  },
  component: LangLayout,
});

function LangLayout() {
  const { lang } = Route.useParams();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (isLang(lang) && i18n.language?.split("-")[0] !== lang) {
      i18n.changeLanguage(lang);
    }
    document.documentElement.lang = lang;
    document.documentElement.dir = RTL_LANGS.includes(lang) ? "rtl" : "ltr";
  }, [lang, i18n]);

  return <Outlet />;
}
