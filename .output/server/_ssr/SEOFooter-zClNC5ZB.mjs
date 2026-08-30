import { l as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as blogPosts } from "./blogPosts-CVD8345p.mjs";
import { t as Link$1 } from "./SEOHead-Icia765B.mjs";
import { t as GENRES } from "./genreContent-DMBRiqiW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SEOFooter-zClNC5ZB.js
var import_jsx_runtime = require_jsx_runtime();
var SEOFooter = () => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "border-t border-border/30 bg-muted/20 mt-auto",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-6xl mx-auto px-4 py-8 md:py-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-semibold text-foreground mb-3",
						children: "CartoFM"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						"aria-label": "CartoFM pages",
						className: "space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
								to: "/",
								className: "block text-xs text-muted-foreground hover:text-foreground transition-colors",
								children: "Home"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
								to: "/countries",
								className: "block text-xs text-muted-foreground hover:text-foreground transition-colors",
								children: "Listen by Country"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
								to: "/genres",
								className: "block text-xs text-muted-foreground hover:text-foreground transition-colors",
								children: "Listen by Genre"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
								to: "/faq",
								className: "block text-xs text-muted-foreground hover:text-foreground transition-colors",
								children: "FAQ"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
								to: "/who-we-are",
								className: "block text-xs text-muted-foreground hover:text-foreground transition-colors",
								children: "Who We Are"
							})
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-semibold text-foreground mb-3",
						children: "Genres"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						"aria-label": "Radio genres",
						className: "space-y-2",
						children: GENRES.slice(0, 8).map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
							to: `/genres/${g.slug}`,
							className: "block text-xs text-muted-foreground hover:text-foreground transition-colors",
							children: [g.name, " Radio"]
						}, g.slug))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-semibold text-foreground mb-3",
						children: "Popular Countries"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						"aria-label": "Popular countries",
						className: "space-y-2",
						children: [
							{
								code: "US",
								name: "United States"
							},
							{
								code: "GB",
								name: "United Kingdom"
							},
							{
								code: "DE",
								name: "Germany"
							},
							{
								code: "FR",
								name: "France"
							},
							{
								code: "BR",
								name: "Brazil"
							},
							{
								code: "JP",
								name: "Japan"
							},
							{
								code: "IN",
								name: "India"
							},
							{
								code: "MX",
								name: "Mexico"
							},
							{
								code: "NG",
								name: "Nigeria"
							},
							{
								code: "AU",
								name: "Australia"
							},
							{
								code: "CA",
								name: "Canada"
							},
							{
								code: "ES",
								name: "Spain"
							},
							{
								code: "IT",
								name: "Italy"
							},
							{
								code: "KE",
								name: "Kenya"
							},
							{
								code: "ZA",
								name: "South Africa"
							}
						].slice(0, 8).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
							to: `/countries/${c.code}`,
							className: "flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: `https://flagicons.lipis.dev/flags/4x3/${c.code.toLowerCase()}.svg`,
								alt: "",
								"aria-hidden": "true",
								loading: "lazy",
								className: "w-5 h-[15px] rounded-sm object-cover flex-shrink-0"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [c.name, " Radio"] })]
						}, c.code))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-semibold text-foreground mb-3",
							children: "Blog"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							"aria-label": "Blog articles",
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
								to: "/blog",
								className: "block text-xs text-muted-foreground hover:text-foreground transition-colors",
								children: "All Articles"
							}), blogPosts.slice(0, 5).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
								to: `/blog/${p.slug}`,
								className: "block text-xs text-muted-foreground hover:text-foreground transition-colors line-clamp-1",
								children: p.title
							}, p.slug))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
								to: "/terms",
								className: "block text-xs text-muted-foreground hover:text-foreground transition-colors",
								children: "Terms of Service"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
								to: "/privacy",
								className: "block text-xs text-muted-foreground hover:text-foreground transition-colors",
								children: "Privacy Policy"
							})]
						})
					] })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 pt-6 border-t border-border/20 text-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted-foreground",
					children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" CartoFM — Stream live radio stations from around the world. Free, no sign-up required."
					]
				})
			})]
		})
	});
};
//#endregion
export { SEOFooter as t };
