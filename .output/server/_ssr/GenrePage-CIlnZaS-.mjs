import { a as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { l as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-BqEV2lvN.mjs";
import { i as useParams$1, n as SEOHead, r as useNavigate$1, t as Link$1 } from "./SEOHead-Icia765B.mjs";
import { i as matchStationToGenre, n as getGenreBySlug, r as getGenreListSEO, t as GENRES } from "./genreContent-DMBRiqiW.mjs";
import { E as ExternalLink, P as ArrowLeft, f as Play, l as Search, m as Music, u as Radio, v as MapPin, y as LoaderCircle } from "../_libs/lucide-react.mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { i as useGlobalPlayer } from "./RadioPlayerContext-XIOe31kg.mjs";
import { t as Input } from "./input-CQw5mG8g.mjs";
import { t as ScrollArea } from "./scroll-area-B9dYrfOU.mjs";
import { t as PlayerControls } from "./PlayerControls-5L8VLc7u.mjs";
import { t as buildStationItemList } from "./stationJsonLd-CEHbWB_G.mjs";
import { t as useTranslation } from "../_libs/react-i18next.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/GenrePage-CIlnZaS-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var GenreListPage = () => {
	const navigate = useNavigate$1();
	const { t } = useTranslation();
	const { stations, isLoadingStations, currentStation, isPlaying, isLoading: playerLoading, volume, error, play, pause, setVolume, stop, bands, activePreset, updateBands, applyPreset, isFavorite, toggleFavorite } = useGlobalPlayer();
	const seo = getGenreListSEO();
	const genresWithCounts = (0, import_react.useMemo)(() => {
		return GENRES.map((genre) => ({
			...genre,
			count: stations.filter((s) => matchStationToGenre(s.genre, genre.slug)).length
		}));
	}, [stations]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SEOHead, {
				title: seo.title,
				description: seo.description,
				jsonLd: {
					"@context": "https://schema.org",
					"@type": "CollectionPage",
					"name": "Radio by Genre – CartoFM",
					"description": seo.description,
					"url": "https://cartofm.com/genres",
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
					className: "max-w-4xl mx-auto px-4 py-3 flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							onClick: () => navigate("/"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "w-5 h-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Music, { className: "w-5 h-5 text-primary" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-lg font-bold text-foreground",
							children: "Radio by Genre"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-4xl mx-auto px-3 md:px-4 py-3 md:py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground leading-relaxed mb-4 md:mb-6",
					children: "Explore thousands of radio stations organized by music genre. Whether you're into jazz, rock, pop, or electronic music — find your perfect station and start listening instantly."
				}), isLoadingStations ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center justify-center py-20",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-8 h-8 animate-spin text-primary" })
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3",
					children: genresWithCounts.map((genre, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
						initial: {
							opacity: 0,
							y: 10
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: { delay: Math.min(i * .03, .4) },
						onClick: () => navigate(`/genres/${genre.slug}`),
						className: "glass hover:bg-muted/50 rounded-xl p-4 flex items-center gap-3 text-left transition-all hover:scale-[1.02] active:scale-[0.98]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Music, { className: "w-5 h-5 text-primary" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium text-foreground text-sm",
									children: genre.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground",
									children: [genre.count.toLocaleString(), " stations"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "w-4 h-4 text-muted-foreground flex-shrink-0" })
						]
					}, genre.slug))
				})]
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
var GenreDetailPage = () => {
	const { genreSlug } = useParams$1();
	const navigate = useNavigate$1();
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const { t } = useTranslation();
	const { stations, isLoadingStations, currentStation, isPlaying, isLoading: playerLoading, volume, error, play, pause, setVolume, stop, bands, activePreset, updateBands, applyPreset, isFavorite, toggleFavorite } = useGlobalPlayer();
	const genre = getGenreBySlug(genreSlug || "");
	const genreStations = (0, import_react.useMemo)(() => {
		if (!genreSlug) return [];
		const filtered = stations.filter((s) => matchStationToGenre(s.genre, genreSlug));
		if (!searchQuery) return filtered;
		const q = searchQuery.toLowerCase();
		return filtered.filter((s) => s.name.toLowerCase().includes(q) || s.country.toLowerCase().includes(q) || s.city.toLowerCase().includes(q));
	}, [
		stations,
		genreSlug,
		searchQuery
	]);
	if (!genre) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-background flex items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground mb-4",
				children: "Genre not found"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: () => navigate("/genres"),
				children: "Browse Genres"
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SEOHead, {
				title: genre.metaTitle,
				description: genre.metaDescription,
				jsonLd: {
					"@context": "https://schema.org",
					"@graph": [{
						"@type": "CollectionPage",
						"@id": `https://cartofm.com/genres/${genreSlug}`,
						name: genre.headline,
						description: genre.metaDescription,
						url: `https://cartofm.com/genres/${genreSlug}`,
						isPartOf: {
							"@type": "WebSite",
							name: "CartoFM",
							url: "https://cartofm.com"
						},
						about: {
							"@type": "MusicGenre",
							name: genre.name
						},
						numberOfItems: genreStations.length,
						mainEntity: buildStationItemList(genreStations, `https://cartofm.com/genres/${genreSlug}`, 50)
					}]
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "glass border-b border-border/30 sticky top-0 z-40",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-4xl mx-auto px-4 py-3 flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							onClick: () => navigate("/genres"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "w-5 h-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Music, { className: "w-5 h-5 text-primary" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-base font-bold text-foreground",
							children: genre.headline
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [genreStations.length.toLocaleString(), " stations"]
						})] })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-4xl mx-auto px-3 md:px-4 py-3 md:py-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 12
						},
						animate: {
							opacity: 1,
							y: 0
						},
						className: "mb-4 md:mb-6 glass rounded-xl p-3.5 md:p-5 border border-border/20",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground leading-relaxed mb-3",
								children: genre.intro
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "text-sm font-semibold text-foreground mb-2 flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Music, { className: "w-4 h-4 text-primary" }),
									"About ",
									genre.name,
									" Radio"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground leading-relaxed",
								children: genre.description
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: `Search ${genre.name} stations...`,
							value: searchQuery,
							onChange: (e) => setSearchQuery(e.target.value),
							className: "pl-10 bg-muted/50 border-border/50"
						})]
					}),
					isLoadingStations ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center justify-center py-20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-8 h-8 animate-spin text-primary" })
					}) : genreStations.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center py-20 text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "w-12 h-12 mx-auto mb-3 opacity-40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"No ",
							genre.name,
							" stations found"
						] })]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
						className: "h-[calc(100dvh-380px)] md:h-[calc(100dvh-420px)]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-1",
							children: genreStations.map((station) => {
								const isActive = currentStation?.id === station.id;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `w-full flex items-center gap-3 p-3 rounded-lg transition-all ${isActive ? "bg-accent/10 border border-accent/30" : "hover:bg-muted/50"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => play(station),
										className: "flex items-center gap-3 flex-1 min-w-0 text-left",
										"aria-label": `Play ${station.name}`,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: `w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${isActive ? "bg-accent/20" : "bg-muted/50"}`,
												children: station.favicon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: station.favicon,
													alt: "",
													className: "w-7 h-7 rounded-md object-cover",
													onError: (e) => {
														e.target.style.display = "none";
													}
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: `w-4 h-4 ${isActive ? "text-accent" : "text-muted-foreground"}` })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex-1 min-w-0",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: `text-sm font-medium truncate ${isActive ? "text-accent" : "text-foreground"}`,
													children: station.name
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2 text-[10px] text-muted-foreground",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "flex items-center gap-0.5 truncate",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-2.5 h-2.5" }), station.country]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "truncate capitalize",
														children: station.genre
													})]
												})]
											}),
											isActive && isPlaying ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-1 flex-shrink-0",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-1.5 h-1.5 bg-accent rounded-full animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[10px] font-mono text-accent",
													children: "LIVE"
												})]
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "w-4 h-4 text-muted-foreground flex-shrink-0" })
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, {
										to: `/stations/${station.id}`,
										className: "p-1.5 rounded hover:bg-muted/70 text-muted-foreground hover:text-foreground flex-shrink-0",
										"aria-label": `Open ${station.name} station page`,
										title: "Station details",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "w-3.5 h-3.5" })
									})]
								}, station.id);
							})
						})
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
var GenrePage = () => {
	const { genreSlug } = useParams$1();
	if (genreSlug) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenreDetailPage, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenreListPage, {});
};
//#endregion
export { GenrePage as t };
