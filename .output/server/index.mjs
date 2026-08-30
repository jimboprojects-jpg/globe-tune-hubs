globalThis.__nitro_main__ = import.meta.url;
import { i as HTTPError, n as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/placeholder.svg": {
		"type": "image/svg+xml",
		"etag": "\"cb5-3cfZ/x0uNhX4kurZGAkOBE4K/G0\"",
		"mtime": "2026-08-30T09:24:51.823Z",
		"size": 3253,
		"path": "../public/placeholder.svg"
	},
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-08-30T09:24:51.822Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"183-cs2ZMeiH6d8NFDa4eIaNArqR7xk\"",
		"mtime": "2026-08-30T09:24:51.823Z",
		"size": 387,
		"path": "../public/robots.txt"
	},
	"/assets/CountryPage-DVXSoW8E.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cfc1-ZExTx/hFQOGbvbUFecjjijqUIYQ\"",
		"mtime": "2026-08-30T09:24:51.246Z",
		"size": 53185,
		"path": "../public/assets/CountryPage-DVXSoW8E.js"
	},
	"/assets/GenrePage-BFeW2-OM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"220f-nQkwAncD0+JU0YpdATLegg5UcPc\"",
		"mtime": "2026-08-30T09:24:51.247Z",
		"size": 8719,
		"path": "../public/assets/GenrePage-BFeW2-OM.js"
	},
	"/assets/PlayerControls-CBBITQ8M.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11b3-zeRL6lKeHlhp8EzEc2gIpszNpKQ\"",
		"mtime": "2026-08-30T09:24:51.247Z",
		"size": 4531,
		"path": "../public/assets/PlayerControls-CBBITQ8M.js"
	},
	"/assets/SEOFooter-CGiJB50k.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f1b-1vjQrNfjSXoYsMo2/DnTe+Enu+o\"",
		"mtime": "2026-08-30T09:24:51.247Z",
		"size": 3867,
		"path": "../public/assets/SEOFooter-CGiJB50k.js"
	},
	"/assets/SEOHead-xcQbrES8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d23-ZLRgdBv5Gt3pYcYFzBFd++KB2c8\"",
		"mtime": "2026-08-30T09:24:51.247Z",
		"size": 3363,
		"path": "../public/assets/SEOHead-xcQbrES8.js"
	},
	"/assets/arrow-left-ChBvbgVQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-HH0AecHqBvKip1VSLarmkRxTf1c\"",
		"mtime": "2026-08-30T09:24:51.247Z",
		"size": 154,
		"path": "../public/assets/arrow-left-ChBvbgVQ.js"
	},
	"/assets/blog._slug-CcgQl6oT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"127b-pToENUdRB80oUqBtc9J80D/cALc\"",
		"mtime": "2026-08-30T09:24:51.247Z",
		"size": 4731,
		"path": "../public/assets/blog._slug-CcgQl6oT.js"
	},
	"/assets/blog.index-Mq460xcK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ce0-8OYCP5nwlhug7IRPNJsJzLThlvQ\"",
		"mtime": "2026-08-30T09:24:51.247Z",
		"size": 3296,
		"path": "../public/assets/blog.index-Mq460xcK.js"
	},
	"/assets/countries._countryCode-B90NzKa7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4d-Ez0ldRCCjMfBvfEkW2sd63eYud8\"",
		"mtime": "2026-08-30T09:24:51.247Z",
		"size": 77,
		"path": "../public/assets/countries._countryCode-B90NzKa7.js"
	},
	"/assets/countries.index-B90NzKa7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4d-Ez0ldRCCjMfBvfEkW2sd63eYud8\"",
		"mtime": "2026-08-30T09:24:51.247Z",
		"size": 77,
		"path": "../public/assets/countries.index-B90NzKa7.js"
	},
	"/assets/faq-B8aLtjTE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15a4-MUsSuRpB/ZdW7hV+6hNJKncSOQ8\"",
		"mtime": "2026-08-30T09:24:51.247Z",
		"size": 5540,
		"path": "../public/assets/faq-B8aLtjTE.js"
	},
	"/assets/file-text-C29AIbZ7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"176-V1rFKl58SDbPcK2EjbrGr+L0yio\"",
		"mtime": "2026-08-30T09:24:51.247Z",
		"size": 374,
		"path": "../public/assets/file-text-C29AIbZ7.js"
	},
	"/assets/genres._genreSlug-BLOZZp4q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4b-9+A4MO+lJzeapOJsLZdObB3jQnQ\"",
		"mtime": "2026-08-30T09:24:51.247Z",
		"size": 75,
		"path": "../public/assets/genres._genreSlug-BLOZZp4q.js"
	},
	"/assets/genres.index-BLOZZp4q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4b-9+A4MO+lJzeapOJsLZdObB3jQnQ\"",
		"mtime": "2026-08-30T09:24:51.247Z",
		"size": 75,
		"path": "../public/assets/genres.index-BLOZZp4q.js"
	},
	"/assets/globe-1_6BxSnF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e7-q9nRJCp9BiwyMn+gnKSKx3FgKFc\"",
		"mtime": "2026-08-30T09:24:51.247Z",
		"size": 231,
		"path": "../public/assets/globe-1_6BxSnF.js"
	},
	"/assets/input-DU66E2ZO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"399-o07Ksr3lnylhJw0sEfLr8Lt5RY0\"",
		"mtime": "2026-08-30T09:24:51.247Z",
		"size": 921,
		"path": "../public/assets/input-DU66E2ZO.js"
	},
	"/favicon.png": {
		"type": "image/png",
		"etag": "\"19f28-BqDWK5ptEANJkolGscP0I6QbeiE\"",
		"mtime": "2026-08-30T09:24:51.823Z",
		"size": 106280,
		"path": "../public/favicon.png"
	},
	"/assets/languages-DN0lxJvV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"131-NWJ9BzbOq7GvzPC5swdndBKFnGs\"",
		"mtime": "2026-08-30T09:24:51.247Z",
		"size": 305,
		"path": "../public/assets/languages-DN0lxJvV.js"
	},
	"/assets/privacy-CqGleLvg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"878-Fl3lQsJtqrm39lYStHuHZkld6wU\"",
		"mtime": "2026-08-30T09:24:51.247Z",
		"size": 2168,
		"path": "../public/assets/privacy-CqGleLvg.js"
	},
	"/ads.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"3a-Io4MBgcf7BkYXuM5B7GkERyOPgc\"",
		"mtime": "2026-08-30T09:24:51.822Z",
		"size": 58,
		"path": "../public/ads.txt"
	},
	"/sitemap.xml": {
		"type": "application/xml",
		"etag": "\"6d2c0-AQ9vwOI6Px5m8SPmvE//KYU3GTc\"",
		"mtime": "2026-08-30T09:24:51.823Z",
		"size": 447168,
		"path": "../public/sitemap.xml"
	},
	"/assets/index-BVB1qWd7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ac626-zDPQvHMyGt3bEbqKTTDqghd0WaE\"",
		"mtime": "2026-08-30T09:24:51.241Z",
		"size": 706086,
		"path": "../public/assets/index-BVB1qWd7.js"
	},
	"/assets/scroll-area-Cm7rbJkE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"41b3-Fimvmp+xdpvY8Jf/yvfiURm0pJA\"",
		"mtime": "2026-08-30T09:24:51.248Z",
		"size": 16819,
		"path": "../public/assets/scroll-area-Cm7rbJkE.js"
	},
	"/assets/shield-CezoZG23.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"105-LbS0YCClWZkNUSeQbe0I0Q6VV7U\"",
		"mtime": "2026-08-30T09:24:51.248Z",
		"size": 261,
		"path": "../public/assets/shield-CezoZG23.js"
	},
	"/assets/stationJsonLd-DTYyyhtP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"aa6-M5toFIWISd5UAiPHihZxZd3p9+s\"",
		"mtime": "2026-08-30T09:24:51.248Z",
		"size": 2726,
		"path": "../public/assets/stationJsonLd-DTYyyhtP.js"
	},
	"/assets/stations._stationId-bm3bLLc8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1800-BpseUqPMcQV8TUTJfPziD7Hmtho\"",
		"mtime": "2026-08-30T09:24:51.248Z",
		"size": 6144,
		"path": "../public/assets/stations._stationId-bm3bLLc8.js"
	},
	"/assets/styles-CvY2lYIM.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"13d91-UCEqvkflyzjyNeMALccnO3Y1QLw\"",
		"mtime": "2026-08-30T09:24:51.248Z",
		"size": 81297,
		"path": "../public/assets/styles-CvY2lYIM.css"
	},
	"/assets/tag-Cji9e7U-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"271-IOvamDM6PiFArb09rizQ9o3mgAg\"",
		"mtime": "2026-08-30T09:24:51.248Z",
		"size": 625,
		"path": "../public/assets/tag-Cji9e7U-.js"
	},
	"/assets/terms-2FbiFq19.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8b0-yPlmkLvkeniQYQqXNfLGL6+QNJY\"",
		"mtime": "2026-08-30T09:24:51.248Z",
		"size": 2224,
		"path": "../public/assets/terms-2FbiFq19.js"
	},
	"/assets/useTranslation-C8q7VfYP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e86-TvRhqLH4BI4ATAW2OVEc/vV5LX4\"",
		"mtime": "2026-08-30T09:24:51.248Z",
		"size": 3718,
		"path": "../public/assets/useTranslation-C8q7VfYP.js"
	},
	"/assets/users-DNB04qCi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1df-1OWTMYxL9v54OnUrctrWHCywDso\"",
		"mtime": "2026-08-30T09:24:51.248Z",
		"size": 479,
		"path": "../public/assets/users-DNB04qCi.js"
	},
	"/assets/who-we-are-DALwUb4e.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d2f-72y4Oco8tsU3n3ndHGvBHYYUdGY\"",
		"mtime": "2026-08-30T09:24:51.248Z",
		"size": 3375,
		"path": "../public/assets/who-we-are-DALwUb4e.js"
	},
	"/assets/routes-BbRx9ddJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cc5a9-oiS4zBsKbd1wsi57ekx8s5ExN4Y\"",
		"mtime": "2026-08-30T09:24:51.247Z",
		"size": 837033,
		"path": "../public/assets/routes-BbRx9ddJ.js"
	},
	"/textures/earth-night.jpg": {
		"type": "image/jpeg",
		"etag": "\"ae8f8-/6o1//oQ+SdmQaJyN1QmULlWepY\"",
		"mtime": "2026-08-30T09:24:51.822Z",
		"size": 715e3,
		"path": "../public/textures/earth-night.jpg"
	},
	"/textures/earth-hires.jpg": {
		"type": "image/jpeg",
		"etag": "\"9f8cc-tArU4nWoR2ENxeNTYVivasbv4MY\"",
		"mtime": "2026-08-30T09:24:51.822Z",
		"size": 653516,
		"path": "../public/textures/earth-hires.jpg"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_RfVFMN = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_RfVFMN
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
