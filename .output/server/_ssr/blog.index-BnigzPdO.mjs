import { a as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { l as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-BqEV2lvN.mjs";
import { n as blogPosts, r as getBlogListSEO, t as BLOG_CATEGORIES } from "./blogPosts-CVD8345p.mjs";
import { n as SEOHead, r as useNavigate$1, t as Link$1 } from "./SEOHead-Icia765B.mjs";
import { t as SEOFooter } from "./SEOFooter-zClNC5ZB.mjs";
import { M as Calendar, O as Clock, P as ArrowLeft, a as Tag } from "../_libs/lucide-react.mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/blog.index-BnigzPdO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var BlogList = () => {
	const navigate = useNavigate$1();
	const seo = getBlogListSEO();
	const [activeCategory, setActiveCategory] = (0, import_react.useState)(null);
	const filtered = activeCategory ? blogPosts.filter((p) => p.category === activeCategory) : blogPosts;
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "Blog",
		name: "CartoFM Blog",
		description: seo.description,
		url: "https://cartofm.com/blog",
		publisher: {
			"@type": "Organization",
			name: "CartoFM",
			url: "https://cartofm.com"
		},
		blogPost: blogPosts.map((p) => ({
			"@type": "BlogPosting",
			headline: p.title,
			description: p.excerpt,
			datePublished: p.date,
			author: {
				"@type": "Organization",
				name: "CartoFM"
			},
			url: `https://cartofm.com/blog/${p.slug}`
		}))
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SEOHead, {
				title: seo.title,
				description: seo.description,
				jsonLd
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-border/30",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-4xl mx-auto px-4 py-3 flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						onClick: () => navigate("/"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "w-5 h-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-lg font-bold",
						children: "CartoFM Blog"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "flex-1 max-w-4xl mx-auto px-4 py-8 w-full",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-3xl font-bold mb-2",
							children: "World Radio Culture & Music Discovery"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground",
							children: "Guides, stories, and tips for exploring the world through radio."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2 mb-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setActiveCategory(null),
							className: `px-3 py-1 rounded-full text-xs font-medium transition-colors ${!activeCategory ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`,
							children: "All"
						}), BLOG_CATEGORIES.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setActiveCategory(activeCategory === cat ? null : cat),
							className: `px-3 py-1 rounded-full text-xs font-medium transition-colors ${activeCategory === cat ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`,
							children: cat
						}, cat))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-6",
						children: filtered.map((post, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.article, {
							initial: {
								opacity: 0,
								y: 16
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: { delay: i * .05 },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
								to: `/blog/${post.slug}`,
								className: "block p-5 rounded-lg border border-border/40 hover:border-primary/40 bg-card/50 hover:bg-card transition-all group",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3 text-xs text-muted-foreground mb-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "flex items-center gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "w-3 h-3" }), post.date]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "flex items-center gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-3 h-3" }), post.readTime]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "flex items-center gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { className: "w-3 h-3" }), post.category]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-lg font-semibold group-hover:text-primary transition-colors mb-2",
										children: post.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground line-clamp-2",
										children: post.excerpt
									})
								]
							})
						}, post.slug))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SEOFooter, {})
		]
	});
};
var SplitComponent = BlogList;
//#endregion
export { SplitComponent as component };
