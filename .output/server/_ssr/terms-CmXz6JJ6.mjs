import { l as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-BqEV2lvN.mjs";
import { n as SEOHead, r as useNavigate$1 } from "./SEOHead-Icia765B.mjs";
import { t as SEOFooter } from "./SEOFooter-zClNC5ZB.mjs";
import { P as ArrowLeft, T as FileText } from "../_libs/lucide-react.mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { t as useTranslation } from "../_libs/react-i18next.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/terms-CmXz6JJ6.js
var import_jsx_runtime = require_jsx_runtime();
var TermsOfService = () => {
	const navigate = useNavigate$1();
	const { t } = useTranslation();
	const sections = [
		{
			title: t("terms.acceptance"),
			text: t("terms.acceptanceText")
		},
		{
			title: t("terms.description"),
			text: t("terms.descriptionText")
		},
		{
			title: t("terms.content"),
			text: t("terms.contentText")
		},
		{
			title: t("terms.conduct"),
			text: t("terms.conductText")
		},
		{
			title: t("terms.ip"),
			text: t("terms.ipText")
		},
		{
			title: t("terms.liability"),
			text: t("terms.liabilityText")
		},
		{
			title: t("terms.changes"),
			text: t("terms.changesText")
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SEOHead, {
				title: "Terms of Service – CartoFM",
				description: "Read CartoFM's Terms of Service. Understand the rules and guidelines for using our free world radio streaming platform.",
				jsonLd: {
					"@context": "https://schema.org",
					"@type": "WebPage",
					"name": "Terms of Service – CartoFM",
					"url": "https://cartofm.com/terms",
					"isPartOf": {
						"@type": "WebSite",
						"name": "CartoFM",
						"url": "https://cartofm.com"
					}
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "glass border-b border-border/30 sticky top-0 z-40",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-3xl mx-auto px-4 py-3 flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							onClick: () => navigate("/"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "w-5 h-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "w-5 h-5 text-primary" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-lg font-bold text-foreground",
							children: t("terms.title")
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "max-w-3xl mx-auto px-3 md:px-4 py-5 md:py-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 20
					},
					animate: {
						opacity: 1,
						y: 0
					},
					className: "glass rounded-xl p-4 md:p-6 space-y-5 md:space-y-6 text-sm text-muted-foreground leading-relaxed",
					children: [sections.map((section, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "text-base font-semibold text-foreground mb-2",
						children: [
							i + 1,
							". ",
							section.title
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: section.text })] }, i)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground/60 pt-4 border-t border-border/30",
						children: t("terms.lastUpdated")
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SEOFooter, {})
		]
	});
};
var SplitComponent = TermsOfService;
//#endregion
export { SplitComponent as component };
