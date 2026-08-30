import { a as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { l as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { _ as useNavigate, g as Link, l as useLocation, v as useParams, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SEOHead-Icia765B.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Router-compat shim — bridges @/lib/router-compat v6 call sites to
* @tanstack/react-router without hand-rewriting every component.
* This is the same load-bearing pattern used in Klar's dev-copy migration.
*/
function parseTo(to) {
	const [beforeHash, hashStr] = (to ?? "").split("#");
	const [pathname, searchStr] = beforeHash.split("?");
	return {
		pathname: pathname || ".",
		search: searchStr ? Object.fromEntries(new URLSearchParams(searchStr)) : void 0,
		hash: hashStr || void 0
	};
}
function useNavigate$1() {
	const tsNav = useNavigate();
	const router = useRouter();
	return (0, import_react.useCallback)((to, options) => {
		if (typeof to === "number") {
			router.history.go(to);
			return;
		}
		const { pathname, search, hash } = parseTo(to);
		tsNav({
			to: pathname,
			search,
			hash,
			state: options?.state,
			replace: options?.replace
		});
	}, [tsNav, router]);
}
function useLocation$1() {
	const loc = useLocation();
	return (0, import_react.useMemo)(() => ({
		pathname: loc.pathname,
		search: loc.searchStr ? `?${loc.searchStr}` : "",
		hash: loc.hash ?? "",
		state: loc.state ?? null,
		key: loc.pathname + (loc.searchStr ?? "")
	}), [
		loc.pathname,
		loc.searchStr,
		loc.hash,
		loc.state
	]);
}
function useParams$1() {
	return useParams({ strict: false });
}
var Link$1 = (0, import_react.forwardRef)(function Link$2({ to, replace, state, children, ...rest }, ref) {
	const { pathname, search, hash } = parseTo(to);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		ref,
		to: pathname,
		search,
		hash,
		replace,
		state,
		...rest ?? {},
		children
	});
});
var BASE_URL = "https://cartofm.com";
var OG_IMAGE = "https://cartofm.com/og-image.png";
var SUPPORTED_LANGS = [
	"en",
	"fr",
	"es",
	"de",
	"sw",
	"zh",
	"ru",
	"hi",
	"ar",
	"pt",
	"id"
];
var LANG_HREFLANG_MAP = {
	en: "en",
	fr: "fr",
	es: "es",
	de: "de",
	sw: "sw",
	zh: "zh-Hans",
	ru: "ru",
	hi: "hi",
	ar: "ar",
	pt: "pt",
	id: "id"
};
var SEOHead = ({ title, description, jsonLd, ogType = "website", ogImage = OG_IMAGE }) => {
	const canonicalUrl = `${BASE_URL}${useLocation$1().pathname}`;
	(0, import_react.useEffect)(() => {
		document.title = title;
		const setMeta = (attr, key, content) => {
			let el = document.querySelector(`meta[${attr}="${key}"]`);
			if (el) el.setAttribute("content", content);
			else {
				el = document.createElement("meta");
				el.setAttribute(attr, key);
				el.setAttribute("content", content);
				document.head.appendChild(el);
			}
		};
		setMeta("name", "description", description);
		setMeta("name", "robots", "index, follow, max-image-preview:large, max-snippet:-1");
		setMeta("property", "og:title", title);
		setMeta("property", "og:description", description);
		setMeta("property", "og:url", canonicalUrl);
		setMeta("property", "og:type", ogType);
		setMeta("property", "og:image", ogImage);
		setMeta("property", "og:image:alt", title);
		if (ogImage === OG_IMAGE) {
			setMeta("property", "og:image:width", "1200");
			setMeta("property", "og:image:height", "630");
		} else {
			document.querySelector("meta[property=\"og:image:width\"]")?.remove();
			document.querySelector("meta[property=\"og:image:height\"]")?.remove();
		}
		setMeta("property", "og:site_name", "CartoFM");
		setMeta("property", "og:locale", "en_US");
		setMeta("name", "twitter:card", "summary_large_image");
		setMeta("name", "twitter:title", title);
		setMeta("name", "twitter:description", description);
		setMeta("name", "twitter:image", ogImage);
		setMeta("name", "twitter:image:alt", title);
		setMeta("name", "twitter:site", "@CartoFM");
		let canonical = document.querySelector("link[rel=\"canonical\"]");
		if (!canonical) {
			canonical = document.createElement("link");
			canonical.rel = "canonical";
			document.head.appendChild(canonical);
		}
		canonical.href = canonicalUrl;
		document.querySelectorAll("link[data-hreflang]").forEach((el) => el.remove());
		for (const lang of SUPPORTED_LANGS) {
			const link = document.createElement("link");
			link.rel = "alternate";
			link.hreflang = LANG_HREFLANG_MAP[lang];
			link.href = canonicalUrl;
			link.setAttribute("data-hreflang", "true");
			document.head.appendChild(link);
		}
		const xDefault = document.createElement("link");
		xDefault.rel = "alternate";
		xDefault.hreflang = "x-default";
		xDefault.href = canonicalUrl;
		xDefault.setAttribute("data-hreflang", "true");
		document.head.appendChild(xDefault);
		if (jsonLd) {
			const existing = document.getElementById("page-jsonld");
			if (existing) existing.remove();
			const script = document.createElement("script");
			script.type = "application/ld+json";
			script.id = "page-jsonld";
			script.textContent = JSON.stringify(jsonLd);
			document.head.appendChild(script);
		}
		return () => {
			document.title = "CartoFM – Stream Live Radio Stations Worldwide";
			const jsonLdScript = document.getElementById("page-jsonld");
			if (jsonLdScript) jsonLdScript.remove();
			document.querySelectorAll("link[data-hreflang]").forEach((el) => el.remove());
		};
	}, [
		title,
		description,
		canonicalUrl,
		jsonLd,
		ogType,
		ogImage
	]);
	return null;
};
//#endregion
export { useParams$1 as i, SEOHead as n, useNavigate$1 as r, Link$1 as t };
