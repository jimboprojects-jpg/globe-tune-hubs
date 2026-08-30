import { a as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { l as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-BqEV2lvN.mjs";
import { i as useParams$1, n as SEOHead, r as useNavigate$1, t as Link$1 } from "./SEOHead-Icia765B.mjs";
import { P as ArrowLeft, S as Heart, b as Languages, f as Play, m as Music, p as Pause, u as Radio, v as MapPin, w as Globe, y as LoaderCircle } from "../_libs/lucide-react.mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { i as useGlobalPlayer } from "./RadioPlayerContext-XIOe31kg.mjs";
import { t as PlayerControls } from "./PlayerControls-5L8VLc7u.mjs";
import { n as buildStationPageJsonLd } from "./stationJsonLd-CEHbWB_G.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stations._stationId-7FyGt0JU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var StationPage = () => {
	const { stationId } = useParams$1();
	const navigate = useNavigate$1();
	const { stations, isLoadingStations, currentStation, isPlaying, isLoading: playerLoading, volume, error, play, pause, setVolume, stop, bands, activePreset, updateBands, applyPreset, isFavorite, toggleFavorite } = useGlobalPlayer();
	const station = (0, import_react.useMemo)(() => stations.find((s) => s.id === stationId) || null, [stations, stationId]);
	if (isLoadingStations && !station) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-background flex items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-8 h-8 animate-spin text-primary" })
	});
	if (!station) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-background flex items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "w-12 h-12 mx-auto mb-3 opacity-40 text-muted-foreground" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground mb-4",
					children: "Station not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => navigate("/countries"),
					children: "Browse Stations"
				})
			]
		})
	});
	const pageUrl = `https://cartofm.com/stations/${station.id}`;
	const title = `${station.name} – Listen Live ${station.country ? `from ${station.country}` : ""} | CartoFM`;
	const description = `Stream ${station.name} live online for free. ${station.genre ? `${station.genre} radio` : "Radio station"} broadcasting${station.city ? ` from ${station.city},` : ""}${station.country ? ` ${station.country}` : ""}. Listen in your browser, no signup required.`;
	const jsonLd = buildStationPageJsonLd(station, pageUrl);
	const isActive = currentStation?.id === station.id;
	const fav = isFavorite(station.id);
	const ogImage = station.favicon && /^https:\/\//i.test(station.favicon) ? station.favicon : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SEOHead, {
				title,
				description,
				jsonLd,
				ogType: "music.radio_station",
				ogImage
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "glass border-b border-border/30 sticky top-0 z-40",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-3xl mx-auto px-4 py-3 flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							onClick: () => navigate(-1),
							"aria-label": "Back",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "w-5 h-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "w-5 h-5 text-primary" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-base font-bold text-foreground truncate",
							children: station.name
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "max-w-3xl mx-auto px-3 md:px-4 py-4 md:py-6 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.section, {
						initial: {
							opacity: 0,
							y: 12
						},
						animate: {
							opacity: 1,
							y: 0
						},
						className: "glass rounded-2xl p-5 md:p-7 border border-border/20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-4 md:gap-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-muted/50 flex items-center justify-center flex-shrink-0 overflow-hidden",
								children: station.favicon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: station.favicon,
									alt: `${station.name} logo`,
									className: "w-full h-full object-cover",
									onError: (e) => {
										e.target.style.display = "none";
									}
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "w-10 h-10 text-muted-foreground" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-xl md:text-2xl font-bold text-foreground mb-1",
										children: station.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground",
										children: [
											station.city && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "flex items-center gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-3 h-3" }), station.city]
											}),
											station.country && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
												to: `/countries/${station.countryCode?.toUpperCase()}`,
												className: "flex items-center gap-1 hover:text-primary",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "w-3 h-3" }), station.country]
											}),
											station.genre && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "flex items-center gap-1 capitalize",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Music, { className: "w-3 h-3" }), station.genre]
											}),
											station.language && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "flex items-center gap-1 capitalize",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Languages, { className: "w-3 h-3" }), station.language]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 mt-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											onClick: () => isActive && isPlaying ? pause() : play(station),
											className: "rounded-full",
											size: "lg",
											children: isActive && isPlaying ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "w-4 h-4 mr-2" }), "Pause"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "w-4 h-4 mr-2" }), "Listen Live"] })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											size: "icon",
											onClick: () => toggleFavorite(station.id),
											"aria-label": fav ? "Remove from favorites" : "Add to favorites",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: `w-5 h-5 ${fav ? "fill-accent text-accent" : ""}` })
										})]
									})
								]
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "glass rounded-2xl p-5 md:p-6 border border-border/20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "text-sm font-semibold text-foreground mb-2",
							children: ["About ", station.name]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted-foreground leading-relaxed",
							children: [
								station.name,
								" is a live",
								station.genre ? ` ${station.genre}` : "",
								" radio station",
								station.city ? ` broadcasting from ${station.city}` : "",
								station.country ? `${station.city ? "," : " broadcasting from"} ${station.country}` : "",
								". Listen online for free directly in your browser on CartoFM — no app, no signup, no ads from us. Tune in to discover the sound of ",
								station.country || "the world",
								" and explore thousands of other free internet radio stations on our interactive globe."
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						"aria-label": "Related",
						className: "grid grid-cols-2 gap-2 text-sm",
						children: [station.countryCode && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
							to: `/countries/${station.countryCode.toUpperCase()}`,
							className: "glass hover:bg-muted/50 rounded-xl p-3 transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground",
								children: "More from"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-medium text-foreground truncate",
								children: station.country
							})]
						}), station.genre && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link$1, {
							to: `/genres/${encodeURIComponent(station.genre.toLowerCase().split(/[ ,]/)[0])}`,
							className: "glass hover:bg-muted/50 rounded-xl p-3 transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground",
								children: "Explore genre"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-medium text-foreground truncate capitalize",
								children: station.genre
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayerControls, {
				station: currentStation,
				isPlaying,
				isLoading: playerLoading,
				volume,
				error,
				onPlay: () => currentStation && play(currentStation),
				onPause: pause,
				onVolumeChange: setVolume,
				onStop: stop,
				eqBands: bands,
				eqActivePreset: activePreset,
				onEqBandsChange: updateBands,
				onEqPresetChange: applyPreset,
				isFavorite: currentStation ? isFavorite(currentStation.id) : false,
				onToggleFavorite: () => currentStation && toggleFavorite(currentStation.id)
			})
		]
	});
};
var SplitComponent = StationPage;
//#endregion
export { SplitComponent as component };
