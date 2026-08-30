import { a as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { l as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as cn, t as Button } from "./button-BqEV2lvN.mjs";
import { o as SlidersHorizontal, t as X } from "../_libs/lucide-react.mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion.mjs";
import { i as SliderTrack, n as SliderRange, r as SliderThumb, t as Slider$1 } from "../_libs/@radix-ui/react-slider+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/RadioPlayerContext-XIOe31kg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var useRadioPlayer = () => {
	const [currentStation, setCurrentStation] = (0, import_react.useState)(null);
	const [isPlaying, setIsPlaying] = (0, import_react.useState)(false);
	const [isLoading, setIsLoading] = (0, import_react.useState)(false);
	const [volume, setVolumeState] = (0, import_react.useState)(.7);
	const [error, setError] = (0, import_react.useState)(null);
	const audioRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		audioRef.current = new Audio();
		audioRef.current.crossOrigin = "anonymous";
		audioRef.current.volume = volume;
		const audio = audioRef.current;
		const handlePlay = () => {
			setIsPlaying(true);
			setIsLoading(false);
		};
		const handlePause = () => {
			setIsPlaying(false);
		};
		const handleError = () => {
			setError("Unable to play this station. Stream may be unavailable.");
			setIsLoading(false);
			setIsPlaying(false);
		};
		const handleWaiting = () => {
			setIsLoading(true);
		};
		const handleCanPlay = () => {
			setIsLoading(false);
		};
		audio.addEventListener("play", handlePlay);
		audio.addEventListener("pause", handlePause);
		audio.addEventListener("error", handleError);
		audio.addEventListener("waiting", handleWaiting);
		audio.addEventListener("canplay", handleCanPlay);
		return () => {
			audio.removeEventListener("play", handlePlay);
			audio.removeEventListener("pause", handlePause);
			audio.removeEventListener("error", handleError);
			audio.removeEventListener("waiting", handleWaiting);
			audio.removeEventListener("canplay", handleCanPlay);
			audio.pause();
			audio.src = "";
		};
	}, []);
	const play = (0, import_react.useCallback)((station) => {
		if (!audioRef.current) return;
		setError(null);
		setIsLoading(true);
		if (currentStation?.id === station.id && audioRef.current.src) {
			audioRef.current.play().catch(() => {
				setError("Playback failed. Please try again.");
				setIsLoading(false);
			});
			return;
		}
		setCurrentStation(station);
		audioRef.current.pause();
		audioRef.current.src = station.streamUrl;
		audioRef.current.crossOrigin = "anonymous";
		audioRef.current.load();
		audioRef.current.play().catch((err) => {
			console.error("Play error:", err);
			setError("Unable to connect to station. Please try another.");
			setIsLoading(false);
		});
	}, [currentStation]);
	const pause = (0, import_react.useCallback)(() => {
		if (audioRef.current) audioRef.current.pause();
	}, []);
	return {
		currentStation,
		isPlaying,
		isLoading,
		volume,
		error,
		play,
		pause,
		toggle: (0, import_react.useCallback)(() => {
			if (!currentStation) return;
			if (isPlaying) pause();
			else play(currentStation);
		}, [
			currentStation,
			isPlaying,
			pause,
			play
		]),
		setVolume: (0, import_react.useCallback)((newVolume) => {
			setVolumeState(newVolume);
			if (audioRef.current) audioRef.current.volume = newVolume;
		}, []),
		stop: (0, import_react.useCallback)(() => {
			if (audioRef.current) {
				audioRef.current.pause();
				audioRef.current.src = "";
			}
			setCurrentStation(null);
			setIsPlaying(false);
			setError(null);
		}, []),
		audioElement: audioRef.current
	};
};
var Slider = import_react.forwardRef(({ className, orientation, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Slider$1, {
	ref,
	className: cn("relative flex touch-none select-none", orientation === "vertical" ? "flex-col h-full w-4 items-center" : "w-full items-center", className),
	orientation,
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderTrack, {
		className: cn("relative grow overflow-hidden rounded-full bg-secondary", orientation === "vertical" ? "w-1.5 h-full" : "h-1.5 w-full"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRange, { className: cn("absolute bg-primary rounded-full", orientation === "vertical" ? "w-full" : "h-full") })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderThumb, { className: "block h-3.5 w-3.5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" })]
}));
Slider.displayName = Slider$1.displayName;
var EQ_PRESETS = [
	{
		name: "Flat",
		bands: [
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			0
		]
	},
	{
		name: "Rock",
		bands: [
			5,
			4,
			-2,
			-3,
			1,
			3,
			5,
			4
		]
	},
	{
		name: "Pop",
		bands: [
			-1,
			2,
			4,
			5,
			4,
			1,
			-1,
			-2
		]
	},
	{
		name: "Jazz",
		bands: [
			3,
			1,
			-1,
			2,
			-1,
			1,
			3,
			4
		]
	},
	{
		name: "Classical",
		bands: [
			4,
			3,
			1,
			-1,
			-1,
			1,
			3,
			5
		]
	},
	{
		name: "Bass Boost",
		bands: [
			6,
			5,
			3,
			1,
			0,
			0,
			0,
			0
		]
	},
	{
		name: "Treble",
		bands: [
			0,
			0,
			0,
			0,
			1,
			3,
			5,
			6
		]
	},
	{
		name: "Electronic",
		bands: [
			4,
			3,
			1,
			0,
			-2,
			1,
			4,
			5
		]
	}
];
var FREQ_LABELS = [
	"60",
	"170",
	"310",
	"600",
	"1K",
	"3K",
	"6K",
	"12K"
];
var Equalizer = ({ bands, onBandsChange, activePreset, onPresetChange }) => {
	const [isOpen, setIsOpen] = (0, import_react.useState)(false);
	const handleBandChange = (0, import_react.useCallback)((index, value) => {
		const newBands = [...bands];
		newBands[index] = value;
		onBandsChange(newBands);
	}, [bands, onBandsChange]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		variant: "ghost",
		size: "icon",
		onClick: () => setIsOpen(!isOpen),
		className: `text-muted-foreground hover:text-foreground ${isOpen ? "text-primary" : ""}`,
		title: "Equalizer",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "w-5 h-5" })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: {
			opacity: 0,
			y: 10,
			scale: .95
		},
		animate: {
			opacity: 1,
			y: 0,
			scale: 1
		},
		exit: {
			opacity: 0,
			y: 10,
			scale: .95
		},
		className: "fixed bottom-16 left-2 right-2 md:absolute md:bottom-full md:left-1/2 md:right-auto md:-translate-x-1/2 mb-3 glass-strong rounded-2xl p-3 md:p-4 z-[60] md:w-[500px]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between mb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
					className: "text-sm font-semibold text-foreground flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "w-4 h-4 text-primary" }), "Equalizer"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					onClick: () => setIsOpen(false),
					className: "w-6 h-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-4 h-4" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-1.5 mb-4",
				children: EQ_PRESETS.map((preset) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => onPresetChange(preset),
					className: `px-2.5 py-1 rounded-full text-xs font-medium transition-all ${activePreset === preset.name ? "bg-primary text-primary-foreground glow-primary" : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"}`,
					children: preset.name
				}, preset.name))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-end gap-2 justify-between",
				children: bands.map((gain, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center gap-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] text-primary font-mono",
							children: gain > 0 ? `+${gain}` : gain
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-20 md:h-24 flex items-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
								orientation: "vertical",
								value: [gain],
								min: -8,
								max: 8,
								step: 1,
								onValueChange: ([v]) => handleBandChange(i, v),
								className: "h-full"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[9px] text-muted-foreground font-mono",
							children: FREQ_LABELS[i]
						})
					]
				}, i))
			})
		]
	}) })] });
};
var FREQ_VALUES = [
	60,
	170,
	310,
	600,
	1e3,
	3e3,
	6e3,
	12e3
];
var useEqualizer = () => {
	const [bands, setBands] = (0, import_react.useState)(EQ_PRESETS[0].bands);
	const [activePreset, setActivePreset] = (0, import_react.useState)("Flat");
	const contextRef = (0, import_react.useRef)(null);
	const filtersRef = (0, import_react.useRef)([]);
	const sourceRef = (0, import_react.useRef)(null);
	const connectedAudioRef = (0, import_react.useRef)(null);
	const initEQ = (0, import_react.useCallback)((audioElement) => {
		if (connectedAudioRef.current === audioElement && contextRef.current) {
			if (contextRef.current.state === "suspended") contextRef.current.resume();
			return;
		}
		if (contextRef.current) try {
			contextRef.current.close();
		} catch {}
		const ctx = new AudioContext();
		contextRef.current = ctx;
		const source = ctx.createMediaElementSource(audioElement);
		sourceRef.current = source;
		connectedAudioRef.current = audioElement;
		const filters = FREQ_VALUES.map((freq, i) => {
			const filter = ctx.createBiquadFilter();
			filter.type = i === 0 ? "lowshelf" : i === FREQ_VALUES.length - 1 ? "highshelf" : "peaking";
			filter.frequency.value = freq;
			filter.Q.value = 1.4;
			filter.gain.value = bands[i];
			return filter;
		});
		source.connect(filters[0]);
		for (let i = 0; i < filters.length - 1; i++) filters[i].connect(filters[i + 1]);
		filters[filters.length - 1].connect(ctx.destination);
		filtersRef.current = filters;
	}, []);
	const updateBands = (0, import_react.useCallback)((newBands) => {
		setBands(newBands);
		setActivePreset("Custom");
		filtersRef.current.forEach((filter, i) => {
			if (newBands[i] !== void 0) filter.gain.value = newBands[i];
		});
	}, []);
	const applyPreset = (0, import_react.useCallback)((preset) => {
		setBands(preset.bands);
		setActivePreset(preset.name);
		filtersRef.current.forEach((filter, i) => {
			if (preset.bands[i] !== void 0) filter.gain.value = preset.bands[i];
		});
	}, []);
	(0, import_react.useEffect)(() => {
		return () => {
			if (contextRef.current) try {
				contextRef.current.close();
			} catch {}
		};
	}, []);
	return {
		bands,
		activePreset,
		updateBands,
		applyPreset,
		initEQ,
		audioContext: contextRef
	};
};
var STORAGE_KEY = "radioverse-favorites";
var useFavorites = () => {
	const [favoriteIds, setFavoriteIds] = (0, import_react.useState)(() => {
		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			return stored ? new Set(JSON.parse(stored)) : /* @__PURE__ */ new Set();
		} catch {
			return /* @__PURE__ */ new Set();
		}
	});
	(0, import_react.useEffect)(() => {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify([...favoriteIds]));
		} catch {}
	}, [favoriteIds]);
	return {
		favoriteIds,
		toggleFavorite: (0, import_react.useCallback)((stationId) => {
			setFavoriteIds((prev) => {
				const next = new Set(prev);
				if (next.has(stationId)) next.delete(stationId);
				else next.add(stationId);
				return next;
			});
		}, []),
		isFavorite: (0, import_react.useCallback)((stationId) => favoriteIds.has(stationId), [favoriteIds]),
		count: favoriteIds.size
	};
};
/**
* Parse an m3u playlist string into entries.
* Handles #PLAYLIST for grouping and #EXTINF for station metadata.
*/
var parseM3U = (content) => {
	const lines = content.split("\n");
	const entries = [];
	let currentPlaylist = "";
	let currentName = "";
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i].trim();
		if (line.startsWith("#PLAYLIST:")) currentPlaylist = line.substring(10).trim().replace(/\.m3u$/i, "");
		else if (line.startsWith("#EXTINF:")) {
			const commaIdx = line.indexOf(",");
			currentName = commaIdx >= 0 ? line.substring(commaIdx + 1).trim() : "";
		} else if (line && !line.startsWith("#")) {
			if (currentName) entries.push({
				name: currentName.replace(/_/g, " "),
				streamUrl: line,
				playlist: currentPlaylist.replace(/_/g, " ")
			});
			currentName = "";
		}
	}
	return entries;
};
/**
* Convert radio.net m3u entries to RadioStation objects.
* playlist = genre name
*/
var radioNetEntriesToStations = (entries) => entries.map((e, i) => ({
	id: `rnet-${i}-${hashCode(e.streamUrl)}`,
	name: e.name,
	country: "",
	countryCode: "",
	city: "",
	genre: e.playlist || "Radio",
	streamUrl: e.streamUrl,
	latitude: 0,
	longitude: 0
}));
/**
* Convert radio.garden m3u entries to RadioStation objects.
* playlist = city name
*/
var radioGardenEntriesToStations = (entries) => entries.map((e, i) => ({
	id: `rgdn-${i}-${hashCode(e.streamUrl)}`,
	name: e.name,
	country: "",
	countryCode: "",
	city: e.playlist || "",
	genre: "Radio",
	streamUrl: e.streamUrl,
	latitude: 0,
	longitude: 0
}));
/** Simple string hash for generating unique-ish IDs */
var hashCode = (s) => {
	let h = 0;
	for (let i = 0; i < s.length; i++) h = (h << 5) - h + s.charCodeAt(i) | 0;
	return Math.abs(h).toString(36);
};
var API_SERVERS = [
	"https://de1.api.radio-browser.info",
	"https://nl1.api.radio-browser.info",
	"https://at1.api.radio-browser.info"
];
var mapStation = (s) => ({
	id: s.stationuuid,
	name: s.name.trim(),
	country: s.country,
	countryCode: s.countrycode,
	city: s.state || s.country,
	genre: s.tags ? s.tags.split(",")[0].trim() : "Radio",
	streamUrl: s.url_resolved || s.url,
	latitude: s.geo_lat ?? 0,
	longitude: s.geo_long ?? 0,
	language: s.language,
	favicon: s.favicon,
	clickcount: s.clickcount
});
var isValidStation = (s) => s.name.trim().length > 0;
var getApiServer = (index = 0) => API_SERVERS[index % API_SERVERS.length];
var fetchBatch = async (offset, limit, serverIndex = 0) => {
	const server = getApiServer(serverIndex);
	const response = await fetch(`${server}/json/stations?limit=${limit}&offset=${offset}&hidebroken=true&order=clickcount&reverse=true`, { headers: { "User-Agent": "CartoFMApp/1.0" } });
	if (!response.ok) throw new Error(`Failed to fetch stations: ${response.status}`);
	return response.json();
};
var M3U_URLS = {
	radioNet: "https://raw.githubusercontent.com/jimboprojects-jpg/m3u-radio-music-playlists/main/radio.net/---everything-full.m3u",
	radioGarden: "https://raw.githubusercontent.com/jimboprojects-jpg/m3u-radio-music-playlists/main/radio.garden/---everything-full.m3u"
};
var fetchM3UStations = async (url, converter) => {
	try {
		const response = await fetch(url);
		if (!response.ok) {
			console.warn(`Failed to fetch m3u from ${url}: ${response.status}`);
			return [];
		}
		const entries = parseM3U(await response.text());
		console.log(`Parsed ${entries.length} entries from ${url.split("/").pop()}`);
		return converter(entries);
	} catch (err) {
		console.warn(`Error fetching m3u from ${url}:`, err);
		return [];
	}
};
/** Normalize a stream URL for deduplication (strip protocol, trailing slash, query params) */
var normalizeUrl = (url) => {
	try {
		const u = new URL(url);
		return (u.host + u.pathname).replace(/\/+$/, "").toLowerCase();
	} catch {
		return url.toLowerCase().replace(/^https?:\/\//, "").replace(/\/+$/, "");
	}
};
/** Fetch top stations quickly for initial render (radio-browser only) */
var fetchInitialStations = async () => {
	return (await fetchBatch(0, 5e3)).filter(isValidStation).map(mapStation);
};
/**
* Progressively load ALL remaining stations in background batches,
* then merge in m3u sources.
*/
var fetchRemainingStations = async (onBatch, onComplete) => {
	const BATCH_SIZE = 1e4;
	let offset = 5e3;
	let totalLoaded = 0;
	let serverIndex = 0;
	let consecutiveFailures = 0;
	const MAX_CONSECUTIVE_FAILURES = 3;
	const allRadioBrowserUrls = /* @__PURE__ */ new Set();
	const m3uPromise = Promise.all([fetchM3UStations(M3U_URLS.radioNet, radioNetEntriesToStations), fetchM3UStations(M3U_URLS.radioGarden, radioGardenEntriesToStations)]);
	while (consecutiveFailures < MAX_CONSECUTIVE_FAILURES) try {
		const data = await fetchBatch(offset, BATCH_SIZE, serverIndex);
		consecutiveFailures = 0;
		if (data.length === 0) break;
		const validStations = data.filter(isValidStation).map(mapStation);
		if (validStations.length > 0) {
			onBatch(validStations);
			totalLoaded += validStations.length;
			validStations.forEach((s) => allRadioBrowserUrls.add(normalizeUrl(s.streamUrl)));
		}
		if (data.length < BATCH_SIZE) break;
		offset += BATCH_SIZE;
		serverIndex++;
		await new Promise((r) => setTimeout(r, 300));
	} catch (err) {
		console.warn(`Batch at offset ${offset} failed, trying next server...`, err);
		consecutiveFailures++;
		serverIndex++;
		try {
			const data = await fetchBatch(offset, BATCH_SIZE, serverIndex);
			consecutiveFailures = 0;
			const validStations = data.filter(isValidStation).map(mapStation);
			if (validStations.length > 0) {
				onBatch(validStations);
				totalLoaded += validStations.length;
				validStations.forEach((s) => allRadioBrowserUrls.add(normalizeUrl(s.streamUrl)));
			}
			if (data.length < BATCH_SIZE) break;
			offset += BATCH_SIZE;
			serverIndex++;
			await new Promise((r) => setTimeout(r, 300));
		} catch {
			console.warn(`Skipping batch at offset ${offset}, continuing...`);
			offset += BATCH_SIZE;
			serverIndex++;
		}
	}
	try {
		const [radioNetStations, radioGardenStations] = await m3uPromise;
		const allM3u = [...radioNetStations, ...radioGardenStations];
		const uniqueM3u = allM3u.filter((s) => !allRadioBrowserUrls.has(normalizeUrl(s.streamUrl)));
		if (uniqueM3u.length > 0) {
			const seen = /* @__PURE__ */ new Set();
			const deduped = [];
			for (const s of uniqueM3u) {
				const key = normalizeUrl(s.streamUrl);
				if (!seen.has(key)) {
					seen.add(key);
					deduped.push(s);
				}
			}
			console.log(`M3U merge: ${allM3u.length} total m3u → ${deduped.length} unique additions`);
			onBatch(deduped);
			totalLoaded += deduped.length;
		}
	} catch (err) {
		console.warn("Failed to load m3u stations:", err);
	}
	onComplete?.(totalLoaded);
};
/** Check if a station has valid geo coordinates for globe display */
var stationHasGeo = (s) => s.latitude !== 0 && s.longitude !== 0;
var RadioPlayerContext = (0, import_react.createContext)(null);
var RadioPlayerProvider = ({ children }) => {
	const player = useRadioPlayer();
	const { bands, activePreset, updateBands, applyPreset, initEQ } = useEqualizer();
	const { toggleFavorite, isFavorite, favoriteIds } = useFavorites();
	const [stations, setStations] = (0, import_react.useState)([]);
	const [isLoadingStations, setIsLoadingStations] = (0, import_react.useState)(true);
	const [isBackgroundLoading, setIsBackgroundLoading] = (0, import_react.useState)(false);
	const geoStations = (0, import_react.useMemo)(() => stations.filter(stationHasGeo), [stations]);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		fetchInitialStations().then((initial) => {
			if (cancelled) return;
			setStations(initial);
			setIsLoadingStations(false);
			setIsBackgroundLoading(true);
			fetchRemainingStations((batch) => {
				if (!cancelled) setStations((prev) => [...prev, ...batch]);
			}, (total) => {
				console.log(`Background loading complete: ${total} additional stations loaded`);
				if (!cancelled) setIsBackgroundLoading(false);
			});
		}).catch((err) => {
			console.error("Failed to load stations:", err);
			if (!cancelled) setIsLoadingStations(false);
		});
		return () => {
			cancelled = true;
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (player.audioElement) initEQ(player.audioElement);
	}, [player.audioElement, initEQ]);
	const handlePlay = (0, import_react.useCallback)((station) => {
		if (player.audioElement) initEQ(player.audioElement);
		player.play(station);
	}, [
		player.audioElement,
		initEQ,
		player.play
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioPlayerContext.Provider, {
		value: {
			...player,
			play: handlePlay,
			bands,
			activePreset,
			updateBands,
			applyPreset,
			toggleFavorite,
			isFavorite,
			favoriteIds,
			stations,
			geoStations,
			isLoadingStations,
			isBackgroundLoading
		},
		children
	});
};
var useGlobalPlayer = () => {
	const ctx = (0, import_react.useContext)(RadioPlayerContext);
	if (!ctx) throw new Error("useGlobalPlayer must be used within RadioPlayerProvider");
	return ctx;
};
//#endregion
export { useGlobalPlayer as i, RadioPlayerProvider as n, Slider as r, Equalizer as t };
