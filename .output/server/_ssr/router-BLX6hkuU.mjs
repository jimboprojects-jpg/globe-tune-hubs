import { a as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { l as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { n as cn } from "./button-BqEV2lvN.mjs";
import { i as getBlogPost } from "./blogPosts-CVD8345p.mjs";
import { c as HeadContent, d as createRouter, f as Outlet, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as getGenreBySlug } from "./genreContent-DMBRiqiW.mjs";
import { t as X } from "../_libs/lucide-react.mjs";
import { n as RadioPlayerProvider } from "./RadioPlayerContext-XIOe31kg.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { n as Provider, t as Content2 } from "../_libs/@radix-ui/react-tooltip+[...].mjs";
import { a as Root2, i as Provider$1, n as Close, o as Title, r as Description, s as Viewport, t as Action } from "../_libs/@radix-ui/react-toast+[...].mjs";
import { t as j } from "../_libs/next-themes.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as Analytics } from "../_libs/vercel__analytics.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BLX6hkuU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TooltipProvider = Provider;
var TooltipContent = import_react.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	sideOffset,
	className: cn("z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", className),
	...props
}));
TooltipContent.displayName = Content2.displayName;
var TOAST_LIMIT = 1;
var TOAST_REMOVE_DELAY = 1e6;
var count = 0;
function genId() {
	count = (count + 1) % Number.MAX_SAFE_INTEGER;
	return count.toString();
}
var toastTimeouts = /* @__PURE__ */ new Map();
var addToRemoveQueue = (toastId) => {
	if (toastTimeouts.has(toastId)) return;
	const timeout = setTimeout(() => {
		toastTimeouts.delete(toastId);
		dispatch({
			type: "REMOVE_TOAST",
			toastId
		});
	}, TOAST_REMOVE_DELAY);
	toastTimeouts.set(toastId, timeout);
};
var reducer = (state, action) => {
	switch (action.type) {
		case "ADD_TOAST": return {
			...state,
			toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT)
		};
		case "UPDATE_TOAST": return {
			...state,
			toasts: state.toasts.map((t) => t.id === action.toast.id ? {
				...t,
				...action.toast
			} : t)
		};
		case "DISMISS_TOAST": {
			const { toastId } = action;
			if (toastId) addToRemoveQueue(toastId);
			else state.toasts.forEach((toast) => {
				addToRemoveQueue(toast.id);
			});
			return {
				...state,
				toasts: state.toasts.map((t) => t.id === toastId || toastId === void 0 ? {
					...t,
					open: false
				} : t)
			};
		}
		case "REMOVE_TOAST":
			if (action.toastId === void 0) return {
				...state,
				toasts: []
			};
			return {
				...state,
				toasts: state.toasts.filter((t) => t.id !== action.toastId)
			};
	}
};
var listeners = [];
var memoryState = { toasts: [] };
function dispatch(action) {
	memoryState = reducer(memoryState, action);
	listeners.forEach((listener) => {
		listener(memoryState);
	});
}
function toast$1({ ...props }) {
	const id = genId();
	const update = (props) => dispatch({
		type: "UPDATE_TOAST",
		toast: {
			...props,
			id
		}
	});
	const dismiss = () => dispatch({
		type: "DISMISS_TOAST",
		toastId: id
	});
	dispatch({
		type: "ADD_TOAST",
		toast: {
			...props,
			id,
			open: true,
			onOpenChange: (open) => {
				if (!open) dismiss();
			}
		}
	});
	return {
		id,
		dismiss,
		update
	};
}
function useToast() {
	const [state, setState] = import_react.useState(memoryState);
	import_react.useEffect(() => {
		listeners.push(setState);
		return () => {
			const index = listeners.indexOf(setState);
			if (index > -1) listeners.splice(index, 1);
		};
	}, [state]);
	return {
		...state,
		toast: toast$1,
		dismiss: (toastId) => dispatch({
			type: "DISMISS_TOAST",
			toastId
		})
	};
}
var ToastProvider = Provider$1;
var ToastViewport = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Viewport, {
	ref,
	className: cn("fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]", className),
	...props
}));
ToastViewport.displayName = Viewport.displayName;
var toastVariants = cva("group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full", {
	variants: { variant: {
		default: "border bg-background text-foreground",
		destructive: "destructive group border-destructive bg-destructive text-destructive-foreground"
	} },
	defaultVariants: { variant: "default" }
});
var Toast = import_react.forwardRef(({ className, variant, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root2, {
		ref,
		className: cn(toastVariants({ variant }), className),
		...props
	});
});
Toast.displayName = Root2.displayName;
var ToastAction = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
	ref,
	className: cn("inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors group-[.destructive]:border-muted/40 hover:bg-secondary group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 group-[.destructive]:focus:ring-destructive disabled:pointer-events-none disabled:opacity-50", className),
	...props
}));
ToastAction.displayName = Action.displayName;
var ToastClose = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Close, {
	ref,
	className: cn("absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity group-hover:opacity-100 group-[.destructive]:text-red-300 hover:text-foreground group-[.destructive]:hover:text-red-50 focus:opacity-100 focus:outline-none focus:ring-2 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600", className),
	"toast-close": "",
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
}));
ToastClose.displayName = Close.displayName;
var ToastTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
	ref,
	className: cn("text-sm font-semibold", className),
	...props
}));
ToastTitle.displayName = Title.displayName;
var ToastDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description, {
	ref,
	className: cn("text-sm opacity-90", className),
	...props
}));
ToastDescription.displayName = Description.displayName;
function Toaster$2() {
	const { toasts } = useToast();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ToastProvider, { children: [toasts.map(function({ id, title, description, action, ...props }) {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Toast, {
			...props,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-1",
					children: [title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastTitle, { children: title }), description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastDescription, { children: description })]
				}),
				action,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastClose, {})
			]
		}, id);
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastViewport, {})] });
}
var Toaster$1 = ({ ...props }) => {
	const { theme = "system" } = j();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		theme,
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
var styles_default = "/assets/styles-CvY2lYIM.css";
var SITE_JSON_LD = JSON.stringify({
	"@context": "https://schema.org",
	"@type": "WebApplication",
	name: "CartoFM",
	url: "https://cartofm.com",
	description: "Stream thousands of live radio stations from around the world. Discover music, news, talk shows, and local broadcasts from every country.",
	applicationCategory: "MultimediaApplication",
	operatingSystem: "Web",
	offers: {
		"@type": "Offer",
		price: "0",
		priceCurrency: "USD"
	},
	author: {
		"@type": "Organization",
		name: "CartoFM",
		url: "https://cartofm.com"
	}
});
var DEFAULT_TITLE = "CartoFM – Stream Live Radio Stations Worldwide";
var DEFAULT_DESCRIPTION = "CartoFM lets you listen to thousands of live radio stations from around the world. Discover music, news, talk shows, and local broadcasts from every country.";
var Route$12 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1.0"
			},
			{ title: DEFAULT_TITLE },
			{
				name: "description",
				content: DEFAULT_DESCRIPTION
			},
			{
				name: "author",
				content: "CartoFM"
			},
			{
				name: "keywords",
				content: "radio, live radio, world radio, streaming, globe, interactive, music, internet radio, FM, AM"
			},
			{
				name: "robots",
				content: "index, follow, max-image-preview:large, max-snippet:-1"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:site_name",
				content: "CartoFM"
			},
			{
				property: "og:locale",
				content: "en_US"
			},
			{
				property: "og:title",
				content: DEFAULT_TITLE
			},
			{
				property: "og:description",
				content: DEFAULT_DESCRIPTION
			},
			{
				property: "og:image",
				content: "https://cartofm.com/og-image.png"
			},
			{
				property: "og:image:width",
				content: "1200"
			},
			{
				property: "og:image:height",
				content: "630"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:site",
				content: "@CartoFM"
			},
			{
				name: "twitter:title",
				content: DEFAULT_TITLE
			},
			{
				name: "twitter:description",
				content: DEFAULT_DESCRIPTION
			},
			{
				name: "twitter:image",
				content: "https://cartofm.com/og-image.png"
			}
		],
		links: [{
			rel: "stylesheet",
			href: styles_default
		}, {
			rel: "icon",
			type: "image/png",
			href: "/favicon.png"
		}],
		scripts: [
			{
				type: "application/ld+json",
				children: SITE_JSON_LD
			},
			{
				src: "https://www.googletagmanager.com/gtag/js?id=G-EH3Q4W2V01",
				async: true
			},
			{ children: "window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-EH3Q4W2V01');" }
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$12.useRouteContext();
	(0, import_react.useEffect)(() => {
		const script = document.createElement("script");
		script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2116450199889361";
		script.async = true;
		script.crossOrigin = "anonymous";
		document.head.appendChild(script);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TooltipProvider, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$2, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioPlayerProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) })
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Analytics, {})]
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-muted",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mb-4 text-4xl font-bold",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-4 text-xl text-muted-foreground",
					children: "Oops! Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "/",
					className: "text-primary underline hover:text-primary/90",
					children: "Return to Home"
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mb-3 text-2xl font-bold text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-6 text-muted-foreground",
					children: "Something went wrong while loading this page."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "rounded-md bg-primary px-4 py-2 text-primary-foreground",
						onClick: () => {
							router.invalidate();
							reset();
						},
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "rounded-md border border-border px-4 py-2 text-foreground",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var $$splitComponentImporter$11 = () => import("./routes-Dnp_gSKO.mjs");
var Route$11 = createFileRoute("/")({
	head: () => ({ links: [{
		rel: "canonical",
		href: "https://cartofm.com/"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./faq-BaXVnoXA.mjs");
var TITLE$6 = "CartoFM FAQ – How Online World Radio Streaming Works";
var DESCRIPTION$6 = "Answers to common questions about CartoFM: how the radio globe works, stream quality, favorites, supported languages and listening for free worldwide.";
var Route$10 = createFileRoute("/faq")({
	head: () => ({
		meta: [
			{ title: TITLE$6 },
			{
				name: "description",
				content: DESCRIPTION$6
			},
			{
				property: "og:title",
				content: TITLE$6
			},
			{
				property: "og:description",
				content: DESCRIPTION$6
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [{
			rel: "canonical",
			href: "https://cartofm.com/faq"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./privacy-DDnDLt5L.mjs");
var TITLE$5 = "Privacy Policy – CartoFM World Radio";
var DESCRIPTION$5 = "CartoFM's Privacy Policy. Learn how we handle your data — no personal information collected, no tracking cookies.";
var Route$9 = createFileRoute("/privacy")({
	head: () => ({
		meta: [
			{ title: TITLE$5 },
			{
				name: "description",
				content: DESCRIPTION$5
			},
			{
				property: "og:title",
				content: TITLE$5
			},
			{
				property: "og:description",
				content: DESCRIPTION$5
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [{
			rel: "canonical",
			href: "https://cartofm.com/privacy"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./terms-CmXz6JJ6.mjs");
var TITLE$4 = "Terms of Service – CartoFM World Radio";
var DESCRIPTION$4 = "Read CartoFM's Terms of Service. Understand the rules and guidelines for using our free world radio streaming platform.";
var Route$8 = createFileRoute("/terms")({
	head: () => ({
		meta: [
			{ title: TITLE$4 },
			{
				name: "description",
				content: DESCRIPTION$4
			},
			{
				property: "og:title",
				content: TITLE$4
			},
			{
				property: "og:description",
				content: DESCRIPTION$4
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [{
			rel: "canonical",
			href: "https://cartofm.com/terms"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./who-we-are-BS2tizLU.mjs");
var TITLE$3 = "Who We Are – The Team Behind CartoFM World Radio";
var DESCRIPTION$3 = "Learn about CartoFM, the interactive world radio platform connecting listeners to thousands of live stations from every corner of the globe.";
var Route$7 = createFileRoute("/who-we-are")({
	head: () => ({
		meta: [
			{ title: TITLE$3 },
			{
				name: "description",
				content: DESCRIPTION$3
			},
			{
				property: "og:title",
				content: TITLE$3
			},
			{
				property: "og:description",
				content: DESCRIPTION$3
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [{
			rel: "canonical",
			href: "https://cartofm.com/who-we-are"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./blog.index-BnigzPdO.mjs");
var TITLE$2 = "World Radio Blog – Music Discovery & Country Guides | CartoFM";
var DESCRIPTION$2 = "Stories, guides and deep dives on world radio culture, music discovery and country-by-country radio traditions from the CartoFM team.";
var Route$6 = createFileRoute("/blog/")({
	head: () => ({
		meta: [
			{ title: TITLE$2 },
			{
				name: "description",
				content: DESCRIPTION$2
			},
			{
				property: "og:title",
				content: TITLE$2
			},
			{
				property: "og:description",
				content: DESCRIPTION$2
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [{
			rel: "canonical",
			href: "https://cartofm.com/blog"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./blog._slug-CZfNkQOF.mjs");
var Route$5 = createFileRoute("/blog/$slug")({
	head: ({ params }) => {
		const post = getBlogPost(params.slug);
		const title = post?.metaTitle ?? "Article – CartoFM Blog";
		const description = post?.metaDescription ?? "Read stories and guides about world radio culture and music discovery on the CartoFM blog.";
		return {
			meta: [
				{ title },
				{
					name: "description",
					content: description
				},
				{
					property: "og:title",
					content: title
				},
				{
					property: "og:description",
					content: description
				},
				{
					property: "og:type",
					content: "article"
				},
				{
					name: "twitter:card",
					content: "summary_large_image"
				}
			],
			links: [{
				rel: "canonical",
				href: `https://cartofm.com/blog/${params.slug}`
			}]
		};
	},
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./countries.index-G5vXBKeU.mjs");
var TITLE$1 = "Radio by Country – Browse Live Stations Worldwide | CartoFM";
var DESCRIPTION$1 = "Browse live radio stations by country. Explore thousands of FM, AM and internet radio streams from every nation on the CartoFM interactive directory.";
var Route$4 = createFileRoute("/countries/")({
	head: () => ({
		meta: [
			{ title: TITLE$1 },
			{
				name: "description",
				content: DESCRIPTION$1
			},
			{
				property: "og:title",
				content: TITLE$1
			},
			{
				property: "og:description",
				content: DESCRIPTION$1
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [{
			rel: "canonical",
			href: "https://cartofm.com/countries"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./countries._countryCode-DIGQCWOU.mjs");
var displayName = (code) => {
	try {
		return new Intl.DisplayNames(["en"], { type: "region" }).of(code.toUpperCase()) ?? code.toUpperCase();
	} catch {
		return code.toUpperCase();
	}
};
var Route$3 = createFileRoute("/countries/$countryCode")({
	head: ({ params }) => {
		const code = displayName(params.countryCode);
		const title = `${code} Radio Stations – Listen Live Online | CartoFM`;
		const description = `Listen to live radio stations from ${code}. Stream local music, news and talk radio for free on CartoFM's interactive world radio map.`;
		return {
			meta: [
				{ title },
				{
					name: "description",
					content: description
				},
				{
					property: "og:title",
					content: title
				},
				{
					property: "og:description",
					content: description
				},
				{
					property: "og:type",
					content: "website"
				},
				{
					name: "twitter:card",
					content: "summary_large_image"
				}
			],
			links: [{
				rel: "canonical",
				href: `https://cartofm.com/countries/${params.countryCode}`
			}]
		};
	},
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./genres.index-BNT5Cfjc.mjs");
var TITLE = "Radio by Genre – Pop, Rock, Jazz, News & More | CartoFM";
var DESCRIPTION = "Browse live radio stations by genre. Stream pop, rock, jazz, classical, electronic, hip-hop, news and more from stations around the world on CartoFM.";
var Route$2 = createFileRoute("/genres/")({
	head: () => ({
		meta: [
			{ title: TITLE },
			{
				name: "description",
				content: DESCRIPTION
			},
			{
				property: "og:title",
				content: TITLE
			},
			{
				property: "og:description",
				content: DESCRIPTION
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [{
			rel: "canonical",
			href: "https://cartofm.com/genres"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./genres._genreSlug-Bn5DtZ5k.mjs");
var Route$1 = createFileRoute("/genres/$genreSlug")({
	head: ({ params }) => {
		const label = getGenreBySlug(params.genreSlug)?.name ?? params.genreSlug.charAt(0).toUpperCase() + params.genreSlug.slice(1);
		const title = `${label} Radio Stations – Listen Live Free | CartoFM`;
		const description = `Stream live ${label} radio stations from around the world for free. Discover new ${label} broadcasts on CartoFM's interactive radio globe.`;
		return {
			meta: [
				{ title },
				{
					name: "description",
					content: description
				},
				{
					property: "og:title",
					content: title
				},
				{
					property: "og:description",
					content: description
				},
				{
					property: "og:type",
					content: "website"
				},
				{
					name: "twitter:card",
					content: "summary_large_image"
				}
			],
			links: [{
				rel: "canonical",
				href: `https://cartofm.com/genres/${params.genreSlug}`
			}]
		};
	},
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./stations._stationId-7FyGt0JU.mjs");
var Route = createFileRoute("/stations/$stationId")({
	head: ({ params }) => ({ links: [{
		rel: "canonical",
		href: `https://cartofm.com/stations/${params.stationId}`
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$11.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$12
});
var FaqRoute = Route$10.update({
	id: "/faq",
	path: "/faq",
	getParentRoute: () => Route$12
});
var PrivacyRoute = Route$9.update({
	id: "/privacy",
	path: "/privacy",
	getParentRoute: () => Route$12
});
var TermsRoute = Route$8.update({
	id: "/terms",
	path: "/terms",
	getParentRoute: () => Route$12
});
var WhoWeAreRoute = Route$7.update({
	id: "/who-we-are",
	path: "/who-we-are",
	getParentRoute: () => Route$12
});
var BlogIndexRoute = Route$6.update({
	id: "/blog/",
	path: "/blog/",
	getParentRoute: () => Route$12
});
var BlogSlugRoute = Route$5.update({
	id: "/blog/$slug",
	path: "/blog/$slug",
	getParentRoute: () => Route$12
});
var CountriesIndexRoute = Route$4.update({
	id: "/countries/",
	path: "/countries/",
	getParentRoute: () => Route$12
});
var CountriesCountryCodeRoute = Route$3.update({
	id: "/countries/$countryCode",
	path: "/countries/$countryCode",
	getParentRoute: () => Route$12
});
var GenresIndexRoute = Route$2.update({
	id: "/genres/",
	path: "/genres/",
	getParentRoute: () => Route$12
});
var rootRouteChildren = {
	IndexRoute,
	FaqRoute,
	PrivacyRoute,
	TermsRoute,
	WhoWeAreRoute,
	BlogSlugRoute,
	CountriesCountryCodeRoute,
	GenresGenreSlugRoute: Route$1.update({
		id: "/genres/$genreSlug",
		path: "/genres/$genreSlug",
		getParentRoute: () => Route$12
	}),
	StationsStationIdRoute: Route.update({
		id: "/stations/$stationId",
		path: "/stations/$stationId",
		getParentRoute: () => Route$12
	}),
	BlogIndexRoute,
	CountriesIndexRoute,
	GenresIndexRoute
};
var routeTree = Route$12._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
