import { l as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-BqEV2lvN.mjs";
import { i as getBlogPost, n as blogPosts } from "./blogPosts-CVD8345p.mjs";
import { i as useParams$1, n as SEOHead, r as useNavigate$1, t as Link$1 } from "./SEOHead-Icia765B.mjs";
import { t as SEOFooter } from "./SEOFooter-zClNC5ZB.mjs";
import { A as ChevronRight, M as Calendar, O as Clock, P as ArrowLeft, a as Tag } from "../_libs/lucide-react.mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/blog._slug-CZfNkQOF.js
var import_jsx_runtime = require_jsx_runtime();
var BlogPostPage = () => {
	const { slug } = useParams$1();
	const navigate = useNavigate$1();
	const post = slug ? getBlogPost(slug) : void 0;
	if (!post) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-background flex items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold mb-4",
				children: "Article Not Found"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: () => navigate("/blog"),
				children: "Back to Blog"
			})]
		})
	});
	const related = blogPosts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 3);
	const combinedLd = [{
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: post.title,
		description: post.metaDescription,
		datePublished: post.date,
		author: {
			"@type": "Organization",
			name: "CartoFM",
			url: "https://cartofm.com"
		},
		publisher: {
			"@type": "Organization",
			name: "CartoFM",
			url: "https://cartofm.com",
			logo: {
				"@type": "ImageObject",
				url: "https://cartofm.com/favicon.png"
			}
		},
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": `https://cartofm.com/blog/${post.slug}`
		},
		keywords: post.tags.join(", ")
	}, {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{
				"@type": "ListItem",
				position: 1,
				name: "Home",
				item: "https://cartofm.com"
			},
			{
				"@type": "ListItem",
				position: 2,
				name: "Blog",
				item: "https://cartofm.com/blog"
			},
			{
				"@type": "ListItem",
				position: 3,
				name: post.title,
				item: `https://cartofm.com/blog/${post.slug}`
			}
		]
	}];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SEOHead, {
				title: post.metaTitle,
				description: post.metaDescription,
				jsonLd: combinedLd,
				ogType: "article"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-border/30",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-3xl mx-auto px-4 py-3 flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						onClick: () => navigate("/blog"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "w-5 h-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "flex items-center gap-1 text-xs text-muted-foreground overflow-hidden",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
								to: "/",
								className: "hover:text-foreground shrink-0",
								children: "Home"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "w-3 h-3 shrink-0" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
								to: "/blog",
								className: "hover:text-foreground shrink-0",
								children: "Blog"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "w-3 h-3 shrink-0" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate text-foreground",
								children: post.title
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "flex-1 max-w-3xl mx-auto px-4 py-8 w-full",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.article, {
						initial: {
							opacity: 0,
							y: 20
						},
						animate: {
							opacity: 1,
							y: 0
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 text-xs text-muted-foreground mb-4",
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
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-3xl md:text-4xl font-bold mb-4 leading-tight",
								children: post.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-lg text-muted-foreground mb-8 italic",
								children: post.excerpt
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "prose prose-invert max-w-none",
								children: post.content.map((para, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted-foreground leading-relaxed mb-5",
									children: para
								}, i))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-2 mt-8 pt-6 border-t border-border/30",
								children: post.tags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "px-3 py-1 rounded-full bg-muted text-xs text-muted-foreground",
									children: tag
								}, tag))
							})
						]
					}),
					related.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-12 pt-8 border-t border-border/30",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl font-semibold mb-4",
							children: "Related Articles"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-4 md:grid-cols-3",
							children: related.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
								to: `/blog/${r.slug}`,
								className: "p-4 rounded-lg border border-border/40 hover:border-primary/40 bg-card/50 hover:bg-card transition-all",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-sm font-semibold mb-1 line-clamp-2",
									children: r.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: r.readTime
								})]
							}, r.slug))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 p-6 rounded-lg bg-muted/30 border border-border/30 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-lg font-semibold mb-2",
								children: "Ready to Explore?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground mb-4",
								children: "Spin the globe and discover radio stations from around the world."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: () => navigate("/"),
								children: "Open CartoFM Globe"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SEOFooter, {})
		]
	});
};
var SplitComponent = BlogPostPage;
//#endregion
export { SplitComponent as component };
