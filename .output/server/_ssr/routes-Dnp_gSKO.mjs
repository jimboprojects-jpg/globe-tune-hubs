import { a as __toESM } from "../_runtime.mjs";
import { a as useThree, c as Float32BufferAttribute, d as Raycaster, f as SRGBColorSpace, h as Vector3, i as useLoader, l as MathUtils, m as Vector2, n as Canvas, o as BufferGeometry, p as TextureLoader, r as useFrame, s as Color, t as OrbitControls, u as PointsMaterial } from "../_libs/@react-three/drei+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { l as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-BqEV2lvN.mjs";
import { n as SEOHead, r as useNavigate$1 } from "./SEOHead-Icia765B.mjs";
import { C as Headphones, D as Earth, N as BookOpen, S as Heart, T as FileText, _ as Menu, b as Languages, c as Shield, d as Plus, g as Minus, h as MousePointer, i as Users, m as Music, r as Volume2, s as Signal, t as X, u as Radio, v as MapPin, w as Globe, x as Info, y as LoaderCircle } from "../_libs/lucide-react.mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion.mjs";
import { i as useGlobalPlayer } from "./RadioPlayerContext-XIOe31kg.mjs";
import { t as ScrollArea } from "./scroll-area-B9dYrfOU.mjs";
import { t as PlayerControls } from "./PlayerControls-5L8VLc7u.mjs";
import { t as useTranslation } from "../_libs/react-i18next.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Dnp_gSKO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var languageNames = {
	en: "English",
	fr: "Français",
	es: "Español",
	de: "Deutsch",
	sw: "Kiswahili",
	zh: "中文",
	ru: "Русский",
	hi: "हिन्दी",
	ar: "العربية",
	pt: "Português",
	id: "Bahasa Indonesia"
};
/**
* Simple 3D spatial hash grid for fast nearest-neighbor lookups.
* Avoids O(n) per-frame scans for 90k+ stations.
*/
var SpatialGrid = class {
	cellSize;
	cells = /* @__PURE__ */ new Map();
	constructor(cellSize = .2) {
		this.cellSize = cellSize;
	}
	key(x, y, z) {
		return `${Math.floor(x / this.cellSize)},${Math.floor(y / this.cellSize)},${Math.floor(z / this.cellSize)}`;
	}
	build(coords, count) {
		this.cells.clear();
		for (let i = 0; i < count; i++) {
			const j = i * 3;
			const k = this.key(coords[j], coords[j + 1], coords[j + 2]);
			let cell = this.cells.get(k);
			if (!cell) {
				cell = [];
				this.cells.set(k, cell);
			}
			cell.push(i);
		}
	}
	/**
	* Find nearest station index within maxDist of point (px,py,pz).
	* Only searches neighboring cells — O(1) average.
	*/
	findNearest(px, py, pz, coords, maxDist) {
		const maxDistSq = maxDist * maxDist;
		let bestIdx = -1;
		let bestSq = maxDistSq;
		const cx = Math.floor(px / this.cellSize);
		const cy = Math.floor(py / this.cellSize);
		const cz = Math.floor(pz / this.cellSize);
		for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) for (let dz = -1; dz <= 1; dz++) {
			const k = `${cx + dx},${cy + dy},${cz + dz}`;
			const cell = this.cells.get(k);
			if (!cell) continue;
			for (const idx of cell) {
				const j = idx * 3;
				const ex = px - coords[j];
				const ey = py - coords[j + 1];
				const ez = pz - coords[j + 2];
				const sq = ex * ex + ey * ey + ez * ez;
				if (sq < bestSq) {
					bestSq = sq;
					bestIdx = idx;
				}
			}
		}
		return bestIdx;
	}
};
var GLOBE_RADIUS = 2;
var FOCUS_THRESHOLD = .12;
var latLongToVector3 = (lat, lon, radius) => {
	const phi = (90 - lat) * (Math.PI / 180);
	const theta = (lon + 180) * (Math.PI / 180);
	return new Vector3(-radius * Math.sin(phi) * Math.cos(theta), radius * Math.cos(phi), radius * Math.sin(phi) * Math.sin(theta));
};
var StationPoints = ({ stations }) => {
	const pointsRef = (0, import_react.useRef)(null);
	const geometry = (0, import_react.useMemo)(() => {
		const positions = new Float32Array(stations.length * 3);
		for (let i = 0; i < stations.length; i++) {
			const p = latLongToVector3(stations[i].latitude, stations[i].longitude, 2.005);
			positions[i * 3] = p.x;
			positions[i * 3 + 1] = p.y;
			positions[i * 3 + 2] = p.z;
		}
		const geo = new BufferGeometry();
		geo.setAttribute("position", new Float32BufferAttribute(positions, 3));
		return geo;
	}, [stations]);
	const material = (0, import_react.useMemo)(() => new PointsMaterial({
		size: .012,
		color: new Color("#4ade80"),
		sizeAttenuation: true,
		transparent: true,
		opacity: .85,
		blending: 2,
		depthWrite: false
	}), []);
	useFrame(({ camera }) => {
		if (!pointsRef.current) return;
		const dist = camera.position.length();
		const sizeFactor = MathUtils.clamp(MathUtils.mapLinear(dist, 2.5, 8, .018, .008), .006, .022);
		const opacityFactor = MathUtils.clamp(MathUtils.mapLinear(dist, 2.5, 8, .95, .6), .5, 1);
		material.size = sizeFactor;
		material.opacity = opacityFactor;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("points", {
		ref: pointsRef,
		geometry,
		material
	});
};
var FocusedMarker = ({ station }) => {
	const coreRef = (0, import_react.useRef)(null);
	const glowRef = (0, import_react.useRef)(null);
	const position = (0, import_react.useMemo)(() => latLongToVector3(station.latitude, station.longitude, 2.01), [station.latitude, station.longitude]);
	useFrame(({ clock }) => {
		const t = clock.elapsedTime;
		if (coreRef.current) coreRef.current.scale.setScalar(1 + Math.sin(t * 4) * .3);
		if (glowRef.current) {
			glowRef.current.scale.setScalar(1.5 + Math.sin(t * 3) * .5);
			glowRef.current.material.opacity = .3 + Math.sin(t * 4) * .15;
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			ref: coreRef,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
				.025,
				16,
				16
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
				color: "#22d3ee",
				transparent: true,
				opacity: .9
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			ref: glowRef,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
				.04,
				16,
				16
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
				color: "#22d3ee",
				transparent: true,
				opacity: .3,
				blending: 2
			})]
		})]
	});
};
var RAYCAST_INTERVAL = 3;
var GlobeScene = (0, import_react.forwardRef)(({ stations, focusedStation, isPlaying, onStationFocus, onGlobeClick, controlsRef }, _ref) => {
	const globeMeshRef = (0, import_react.useRef)(null);
	const focusedIdRef = (0, import_react.useRef)(null);
	const frameCount = (0, import_react.useRef)(0);
	const { camera } = useThree();
	const raycaster = (0, import_react.useMemo)(() => new Raycaster(), []);
	const earthTexture = useLoader(TextureLoader, "/textures/earth-hires.jpg");
	earthTexture.colorSpace = SRGBColorSpace;
	earthTexture.anisotropy = 16;
	const { stationCoords, grid } = (0, import_react.useMemo)(() => {
		const arr = new Float32Array(stations.length * 3);
		for (let i = 0; i < stations.length; i++) {
			const p = latLongToVector3(stations[i].latitude, stations[i].longitude, 2.005);
			arr[i * 3] = p.x;
			arr[i * 3 + 1] = p.y;
			arr[i * 3 + 2] = p.z;
		}
		const g = new SpatialGrid(.15);
		g.build(arr, stations.length);
		return {
			stationCoords: arr,
			grid: g
		};
	}, [stations]);
	useFrame(() => {
		frameCount.current++;
		if (frameCount.current % RAYCAST_INTERVAL !== 0) return;
		if (!globeMeshRef.current || stations.length === 0) return;
		raycaster.setFromCamera(new Vector2(0, 0), camera);
		const hit = raycaster.intersectObject(globeMeshRef.current);
		if (hit.length === 0) return;
		const { x: px, y: py, z: pz } = hit[0].point;
		const nearestIdx = grid.findNearest(px, py, pz, stationCoords, FOCUS_THRESHOLD);
		const newId = nearestIdx >= 0 ? stations[nearestIdx].id : null;
		if (newId !== focusedIdRef.current) {
			focusedIdRef.current = newId;
			onStationFocus(nearestIdx >= 0 ? stations[nearestIdx] : null);
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ambientLight", { intensity: 1.2 }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
			position: [
				5,
				3,
				5
			],
			intensity: 1.5
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
			position: [
				-5,
				-3,
				-5
			],
			intensity: .5,
			color: "#14b8a6"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			ref: globeMeshRef,
			onClick: (e) => {
				e.stopPropagation();
				onGlobeClick();
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
				GLOBE_RADIUS,
				64,
				64
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				map: earthTexture,
				roughness: .6,
				metalness: .05
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
			2.05,
			64,
			64
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
			color: "#14b8a6",
			transparent: true,
			opacity: .04,
			side: 1
		})] }),
		stations.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StationPoints, { stations }),
		focusedStation && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FocusedMarker, { station: focusedStation }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrbitControls, {
			ref: controlsRef,
			enablePan: false,
			enableZoom: true,
			minDistance: 2.5,
			maxDistance: 8,
			rotateSpeed: .4,
			zoomSpeed: .5,
			autoRotate: !isPlaying,
			autoRotateSpeed: .3
		})
	] });
});
GlobeScene.displayName = "GlobeScene";
var Globe$1 = (props) => {
	const controlsRef = (0, import_react.useRef)(null);
	const handleZoom = (0, import_react.useCallback)((direction) => {
		const controls = controlsRef.current;
		if (!controls) return;
		const camera = controls.object;
		const target = controls.target;
		const offset = camera.position.clone().sub(target);
		const distance = offset.length();
		const newDistance = Math.max(2.5, Math.min(8, distance * (direction === "in" ? .8 : 1.25)));
		offset.normalize().multiplyScalar(newDistance);
		camera.position.copy(target).add(offset);
		controls.update();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-full h-full relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Canvas, {
			camera: {
				position: [
					0,
					0,
					5
				],
				fov: 45
			},
			gl: {
				antialias: true,
				alpha: true
			},
			style: { background: "transparent" },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlobeScene, {
				...props,
				controlsRef
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute right-2 md:right-4 bottom-24 md:bottom-auto md:top-1/2 md:-translate-y-1/2 flex flex-col gap-2 z-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => handleZoom("in"),
				className: "glass w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-foreground/80 hover:text-primary hover:glow-primary transition-all",
				"aria-label": "Zoom in",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-5 h-5" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => handleZoom("out"),
				className: "glass w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-foreground/80 hover:text-primary hover:glow-primary transition-all",
				"aria-label": "Zoom out",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "w-5 h-5" })
			})]
		})]
	});
};
var BARS_MINI = 5;
var BARS_FULL = 16;
var barColors = [
	"hsl(var(--primary))",
	"hsl(var(--primary-glow))",
	"hsl(175 84% 55%)",
	"hsl(var(--accent))",
	"hsl(var(--accent-glow))",
	"hsl(35 100% 60%)",
	"hsl(0 84% 60%)",
	"hsl(var(--primary))"
];
var AudioVisualizer = ({ isPlaying, className = "", variant = "mini" }) => {
	const count = variant === "full" ? BARS_FULL : BARS_MINI;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `flex items-end gap-[2px] ${variant === "full" ? "h-12" : "h-4"} ${className}`,
		children: Array.from({ length: count }).map((_, i) => {
			const colorIdx = Math.floor(i / count * barColors.length);
			const color = barColors[Math.min(colorIdx, barColors.length - 1)];
			const maxH = variant === "full" ? 48 : 16;
			const minH = variant === "full" ? 4 : 3;
			const midH1 = minH + (maxH - minH) * (.4 + Math.random() * .3);
			const midH2 = minH + (maxH - minH) * (.5 + Math.random() * .3);
			const midH3 = minH + (maxH - minH) * (.3 + Math.random() * .2);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				className: "rounded-full",
				style: {
					width: variant === "full" ? 3 : 2,
					background: isPlaying ? `linear-gradient(to top, ${color}, hsl(var(--foreground) / 0.7))` : "hsl(var(--muted-foreground) / 0.3)",
					boxShadow: isPlaying ? `0 0 6px ${color}` : "none"
				},
				animate: isPlaying ? { height: [
					`${minH}px`,
					`${midH1}px`,
					`${midH2}px`,
					`${maxH}px`,
					`${midH3}px`,
					`${minH}px`
				] } : { height: `${minH}px` },
				transition: isPlaying ? {
					duration: .6 + Math.random() * .4,
					repeat: Infinity,
					delay: i * .05,
					ease: "easeInOut"
				} : { duration: .3 }
			}, i);
		})
	});
};
var Header = ({ onMenuClick, onInfoClick, stationCount, isBackgroundLoading, currentStation, isPlaying, favoriteCount = 0, favoriteStations = [], onStationSelect, isFavorite, onToggleFavorite }) => {
	const navigate = useNavigate$1();
	const { t, i18n } = useTranslation();
	const [showLangDropdown, setShowLangDropdown] = (0, import_react.useState)(false);
	const [showFavDropdown, setShowFavDropdown] = (0, import_react.useState)(false);
	const langRef = (0, import_react.useRef)(null);
	const favRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const handler = (e) => {
			if (langRef.current && !langRef.current.contains(e.target)) setShowLangDropdown(false);
			if (favRef.current && !favRef.current.contains(e.target)) setShowFavDropdown(false);
		};
		document.addEventListener("mousedown", handler);
		return () => document.removeEventListener("mousedown", handler);
	}, []);
	const currentLang = i18n.language?.split("-")[0] || "en";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.header, {
		initial: {
			y: -20,
			opacity: 0
		},
		animate: {
			y: 0,
			opacity: 1
		},
		className: "fixed top-0 left-0 right-0 z-40 glass border-b border-border/30",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-7xl mx-auto px-3 py-2 md:px-4 md:py-3 flex items-center justify-between",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 flex-shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						onClick: onMenuClick,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "w-5 h-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 cursor-pointer",
						onClick: () => navigate("/"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/favicon.png",
							alt: "CartoFM",
							className: "w-7 h-7 md:w-8 md:h-8 rounded-md"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "text-base md:text-lg font-bold tracking-tight hidden sm:block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-gradient-primary",
								children: "Carto"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-gradient-accent",
								children: "FM"
							})]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
					mode: "wait",
					children: currentStation ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: -10
						},
						animate: {
							opacity: 1,
							y: 0
						},
						exit: {
							opacity: 0,
							y: -10
						},
						className: "flex items-center gap-2 md:gap-3 flex-1 justify-center min-w-0 mx-2 md:mx-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `w-8 h-8 md:w-9 md:h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${isPlaying ? "bg-accent/20" : "bg-primary/20"}`,
							children: currentStation.favicon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: currentStation.favicon,
								alt: "",
								className: "w-6 h-6 md:w-7 md:h-7 rounded-md object-cover",
								onError: (e) => {
									e.target.style.display = "none";
								}
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: `w-4 h-4 ${isPlaying ? "text-accent" : "text-primary"}` })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1 max-w-xs md:max-w-md",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [
									isPlaying && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AudioVisualizer, {
										isPlaying: true,
										className: "flex-shrink-0"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-foreground truncate text-xs md:text-sm",
										children: currentStation.name
									}),
									isPlaying && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1 flex-shrink-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Signal, { className: "w-3 h-3 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[9px] md:text-[10px] font-mono text-accent uppercase",
											children: t("header.live")
										})]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-[10px] md:text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-0.5 truncate",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-2.5 h-2.5 flex-shrink-0" }),
										currentStation.city,
										", ",
										currentStation.country
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "hidden md:flex items-center gap-0.5 truncate",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Music, { className: "w-2.5 h-2.5 flex-shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "capitalize",
										children: currentStation.genre
									})]
								})]
							})]
						})]
					}, "playing") : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: { opacity: 0 },
						animate: { opacity: 1 },
						exit: { opacity: 0 },
						className: "flex items-center justify-center flex-1 mx-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center gap-2 text-xs text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
								mode: "wait",
								children: isBackgroundLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
									initial: { opacity: 0 },
									animate: { opacity: 1 },
									exit: { opacity: 0 },
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-3 h-3 animate-spin text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
											initial: {
												opacity: 0,
												y: -6
											},
											animate: {
												opacity: 1,
												y: 0
											},
											className: "inline-block text-accent font-medium",
											children: stationCount.toLocaleString()
										}, stationCount),
										" ",
										t("header.loadingMore")
									] })]
								}, "loading") : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
									initial: { opacity: 0 },
									animate: { opacity: 1 },
									exit: { opacity: 0 },
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-2 h-2 bg-primary rounded-full animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("header.liveStations", { count: stationCount }) })]
								}, "done")
							})
						})
					}, "status")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1 flex-shrink-0",
					children: [
						currentStation && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hidden md:flex items-center gap-1.5 text-[10px] text-muted-foreground mr-2",
							children: [isBackgroundLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-3 h-3 animate-spin text-accent" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-1.5 h-1.5 bg-primary rounded-full animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: stationCount.toLocaleString() })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							ref: langRef,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "ghost",
								size: "sm",
								onClick: () => {
									setShowLangDropdown(!showLangDropdown);
									setShowFavDropdown(false);
								},
								className: "text-xs text-muted-foreground hover:text-foreground gap-1 px-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Languages, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden sm:inline text-[10px] uppercase font-medium",
									children: currentLang
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: showLangDropdown && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								initial: {
									opacity: 0,
									y: -8,
									scale: .95
								},
								animate: {
									opacity: 1,
									y: 0,
									scale: 1
								},
								exit: {
									opacity: 0,
									y: -8,
									scale: .95
								},
								className: "absolute right-0 top-full mt-1 w-48 glass-strong border border-border/50 rounded-xl shadow-xl z-50 overflow-hidden",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "p-2 grid grid-cols-2 gap-1 max-h-64 overflow-y-auto",
									children: Object.entries(languageNames).map(([code, name]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => {
											i18n.changeLanguage(code);
											setShowLangDropdown(false);
										},
										className: `p-2 rounded-lg text-xs text-left transition-colors ${currentLang === code ? "bg-primary/20 text-primary border border-primary/30" : "hover:bg-muted/50 text-muted-foreground"}`,
										children: name
									}, code))
								})
							}) })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							ref: favRef,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "ghost",
								size: "sm",
								onClick: () => {
									setShowFavDropdown(!showFavDropdown);
									setShowLangDropdown(false);
								},
								className: "text-xs text-muted-foreground hover:text-foreground gap-1 relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "w-4 h-4" }), favoriteCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-[9px] flex items-center justify-center font-bold",
									children: favoriteCount > 9 ? "9+" : favoriteCount
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: showFavDropdown && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								initial: {
									opacity: 0,
									y: -8,
									scale: .95
								},
								animate: {
									opacity: 1,
									y: 0,
									scale: 1
								},
								exit: {
									opacity: 0,
									y: -8,
									scale: .95
								},
								className: "absolute right-0 top-full mt-1 w-72 glass-strong border border-border/50 rounded-xl shadow-xl z-50 overflow-hidden",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
										className: "text-xs uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "w-3.5 h-3.5" }),
											t("menu.favourites"),
											" (",
											favoriteCount,
											")"
										]
									}), favoriteStations.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-center py-4 text-muted-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "w-6 h-6 mx-auto mb-1.5 opacity-40" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs",
												children: t("menu.noFavourites")
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[10px] mt-0.5 text-muted-foreground/60",
												children: t("menu.tapHeart")
											})
										]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1 max-h-60 overflow-y-auto",
										children: [favoriteStations.slice(0, 10).map((station) => {
											const isActive = currentStation?.id === station.id;
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												onClick: () => {
													onStationSelect?.(station);
													setShowFavDropdown(false);
												},
												className: `w-full p-2 rounded-lg text-left transition-all flex items-center gap-2 ${isActive ? isPlaying ? "bg-accent/20 border border-accent/50" : "bg-primary/20 border border-primary/50" : "hover:bg-muted/50 border border-transparent"}`,
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: `w-3.5 h-3.5 flex-shrink-0 ${isActive && isPlaying ? "text-accent" : "text-muted-foreground"}` }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-xs truncate flex-1",
														children: station.name
													}),
													isActive && isPlaying && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 bg-accent rounded-full animate-pulse flex-shrink-0" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														onClick: (e) => {
															e.stopPropagation();
															onToggleFavorite?.(station.id);
														},
														className: "text-red-500 flex-shrink-0 p-0.5",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "w-3 h-3 fill-current" })
													})
												]
											}, station.id);
										}), favoriteStations.length > 10 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] text-muted-foreground/60 text-center pt-1",
											children: t("menu.more", { count: favoriteStations.length - 10 })
										})]
									})]
								})
							}) })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							onClick: onInfoClick,
							className: "text-muted-foreground hover:text-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "w-5 h-5" })
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: isBackgroundLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: { opacity: 0 },
			animate: { opacity: 1 },
			exit: { opacity: 0 },
			className: "absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				className: "h-full bg-gradient-to-r from-transparent via-accent to-transparent",
				animate: { x: ["-100%", "100%"] },
				transition: {
					duration: 2,
					repeat: Infinity,
					ease: "linear"
				},
				style: { width: "50%" }
			})
		}) })]
	});
};
var StationList = ({ stations, currentStation, isPlaying, onStationSelect, isOpen, onClose, isFavorite, onToggleFavorite, favoriteIds }) => {
	const navigate = useNavigate$1();
	const { t } = useTranslation();
	const handleNavigate = (path) => {
		onClose();
		navigate(path);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		onClick: onClose,
		className: "fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: {
			x: -400,
			opacity: 0
		},
		animate: {
			x: 0,
			opacity: 1
		},
		exit: {
			x: -400,
			opacity: 0
		},
		transition: {
			type: "spring",
			damping: 30,
			stiffness: 300
		},
		className: "fixed left-0 top-0 bottom-0 w-full max-w-sm z-50 glass-strong border-r border-border/50",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col h-full",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-4 border-b border-border/50",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/favicon.png",
								alt: "CartoFM",
								className: "w-7 h-7 rounded-md"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "text-lg font-bold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-gradient-primary",
									children: "Carto"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-gradient-accent",
									children: "FM"
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							onClick: onClose,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-5 h-5" })
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
					className: "flex-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-xs uppercase tracking-wider text-muted-foreground mb-3",
								children: t("menu.pages")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => handleNavigate("/countries"),
										className: "w-full flex items-center gap-3 p-3 rounded-lg text-left hover:bg-muted/50 transition-colors",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "w-4 h-4 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm text-foreground font-medium",
											children: t("menu.countries")
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => handleNavigate("/blog"),
										className: "w-full flex items-center gap-3 p-3 rounded-lg text-left hover:bg-muted/50 transition-colors",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "w-4 h-4 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm text-foreground font-medium",
											children: t("menu.blog")
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => handleNavigate("/who-we-are"),
										className: "w-full flex items-center gap-3 p-3 rounded-lg text-left hover:bg-muted/50 transition-colors",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "w-4 h-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm text-foreground",
											children: t("menu.whoWeAre")
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => handleNavigate("/terms"),
										className: "w-full flex items-center gap-3 p-3 rounded-lg text-left hover:bg-muted/50 transition-colors",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "w-4 h-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm text-foreground",
											children: t("menu.terms")
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => handleNavigate("/privacy"),
										className: "w-full flex items-center gap-3 p-3 rounded-lg text-left hover:bg-muted/50 transition-colors",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "w-4 h-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm text-foreground",
											children: t("menu.privacy")
										})]
									})
								]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "border-t border-border/30" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-xs uppercase tracking-wider text-muted-foreground mb-3",
								children: t("menu.followUs")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "https://tiktok.com",
										target: "_blank",
										rel: "noopener noreferrer",
										className: "w-10 h-10 rounded-lg bg-muted/50 hover:bg-muted flex items-center justify-center transition-colors group",
										title: "TikTok",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
											viewBox: "0 0 24 24",
											className: "w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors",
											fill: "currentColor",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.73a8.19 8.19 0 004.76 1.52V6.79a4.83 4.83 0 01-1-.1z" })
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "https://facebook.com",
										target: "_blank",
										rel: "noopener noreferrer",
										className: "w-10 h-10 rounded-lg bg-muted/50 hover:bg-muted flex items-center justify-center transition-colors group",
										title: "Facebook",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
											viewBox: "0 0 24 24",
											className: "w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors",
											fill: "currentColor",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" })
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "https://x.com",
										target: "_blank",
										rel: "noopener noreferrer",
										className: "w-10 h-10 rounded-lg bg-muted/50 hover:bg-muted flex items-center justify-center transition-colors group",
										title: "X (Twitter)",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
											viewBox: "0 0 24 24",
											className: "w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors",
											fill: "currentColor",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" })
										})
									})
								]
							})] })
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-4 border-t border-border/50",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[10px] text-muted-foreground/60 text-center",
						children: String(t("menu.stationsWorldwide", { count: stations.length }))
					})
				})
			]
		})
	})] }) });
};
var InfoModal = ({ isOpen, onClose }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		onClick: onClose,
		className: "fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: {
			scale: .9,
			opacity: 0
		},
		animate: {
			scale: 1,
			opacity: 1
		},
		exit: {
			scale: .9,
			opacity: 0
		},
		className: "fixed inset-3 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-lg md:w-full glass-strong rounded-2xl z-50 overflow-auto max-h-[calc(100dvh-24px)]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-4 md:p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between mb-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/favicon.png",
							alt: "CartoFM",
							className: "w-10 h-10 rounded-xl"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "text-xl font-bold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-gradient-primary",
								children: "Carto"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-gradient-accent",
								children: "FM"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Explore the world through radio"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						onClick: onClose,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-5 h-5" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-3 p-3 rounded-lg bg-muted/30",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Earth, { className: "w-5 h-5 text-primary mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-medium text-sm",
								children: "Explore the Globe"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Click and drag to rotate the 3D globe. Zoom in and out with scroll or pinch gestures."
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-3 p-3 rounded-lg bg-muted/30",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MousePointer, { className: "w-5 h-5 text-primary mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-medium text-sm",
								children: "Select Stations"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Click on any glowing marker to tune into that radio station. Hover to see station details."
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-3 p-3 rounded-lg bg-muted/30",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Headphones, { className: "w-5 h-5 text-accent mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-medium text-sm",
								children: "Listen Live"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "All stations stream live radio from around the world. Audio quality depends on the station."
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-3 p-3 rounded-lg bg-muted/30",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "w-5 h-5 text-accent mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-medium text-sm",
								children: "Playback Controls"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Use the player bar at the bottom to control playback and volume."
							})] })]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 pt-4 border-t border-border/50 text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Made with ❤️ • Inspired by Radio Garden"
					})
				})
			]
		})
	})] }) });
};
var FocusCircle = ({ station, isPlaying }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 pointer-events-none z-10 flex items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `w-14 h-14 md:w-20 md:h-20 rounded-full border-2 transition-all duration-500 ${station ? isPlaying ? "border-accent/70 shadow-[0_0_30px_hsl(var(--accent)/0.3)]" : "border-primary/60 shadow-[0_0_30px_hsl(var(--primary)/0.3)]" : "border-muted-foreground/15"}` }),
				station && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: {
						scale: .8,
						opacity: 0
					},
					animate: {
						scale: 1,
						opacity: 1
					},
					className: `absolute inset-2 rounded-full border transition-all duration-500 ${isPlaying ? "border-accent/30" : "border-primary/20"}`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full transition-colors duration-300 ${station ? isPlaying ? "bg-accent" : "bg-primary" : "bg-muted-foreground/20"}` }),
				!station && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					className: "absolute inset-0 rounded-full border border-muted-foreground/10",
					animate: {
						scale: [1, 1.5],
						opacity: [.3, 0]
					},
					transition: {
						duration: 2,
						repeat: Infinity
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: station && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: {
						opacity: 0,
						y: 8,
						scale: .9
					},
					animate: {
						opacity: 1,
						y: 0,
						scale: 1
					},
					exit: {
						opacity: 0,
						y: 8,
						scale: .9
					},
					transition: { duration: .2 },
					className: "absolute top-full left-1/2 -translate-x-1/2 mt-2 md:mt-3 text-center w-[180px] md:w-auto md:whitespace-nowrap",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass-strong px-2.5 py-2 md:px-4 md:py-3 rounded-xl min-w-[160px] md:min-w-[200px]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-center gap-2 mb-1.5",
								children: [
									isPlaying && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AudioVisualizer, {
										isPlaying,
										variant: "mini"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-xs md:text-sm font-bold text-foreground truncate max-w-[140px] md:max-w-[180px]",
										children: station.name
									}),
									isPlaying && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AudioVisualizer, {
										isPlaying,
										variant: "mini"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-center gap-1.5 text-xs text-muted-foreground mb-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-3 h-3 text-primary flex-shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									station.city,
									", ",
									station.country
								] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-center gap-1.5 text-xs text-muted-foreground/70 mb-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Music, { className: "w-3 h-3 text-accent flex-shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "capitalize",
									children: station.genre
								})]
							}),
							station.language && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-center gap-1.5 text-xs text-muted-foreground/50",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "w-3 h-3 flex-shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "capitalize",
									children: station.language.split(",")[0]
								})]
							}),
							isPlaying && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								initial: { opacity: 0 },
								animate: { opacity: 1 },
								className: "flex items-center justify-center gap-1.5 mt-2 pt-2 border-t border-border/30",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Signal, { className: "w-3 h-3 text-accent" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-mono text-accent uppercase tracking-wider",
										children: "Live FM Signal"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
										className: "w-1.5 h-1.5 rounded-full bg-accent",
										animate: { opacity: [
											1,
											.3,
											1
										] },
										transition: {
											duration: 1,
											repeat: Infinity
										}
									})
								]
							})
						]
					})
				}) })
			]
		})
	});
};
var SatelliteLoader = (0, import_react.forwardRef)(({ message = "Loading radio stations worldwide…" }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		className: "w-full h-full flex flex-col items-center justify-center gap-6 pt-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-24 h-24",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 via-accent/10 to-secondary/30 shadow-[0_0_40px_hsl(var(--primary)/0.2)]" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute inset-1 rounded-full bg-gradient-to-br from-[#1a6b5a] via-[#1a4a7a] to-[#2a3a6a] overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-3 left-4 w-6 h-4 bg-[#3a8a5a]/60 rounded-full rotate-12" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-6 right-3 w-8 h-5 bg-[#3a8a5a]/50 rounded-full -rotate-6" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-4 left-6 w-5 h-3 bg-[#3a8a5a]/40 rounded-full rotate-45" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-8 left-8 w-4 h-6 bg-[#3a8a5a]/50 rounded-full -rotate-12" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -inset-1 rounded-full border border-primary/20" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					className: "absolute w-full h-full",
					animate: { rotate: 360 },
					transition: {
						duration: 3,
						repeat: Infinity,
						ease: "linear"
					},
					style: { transformOrigin: "center center" },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute -top-2 left-1/2 -translate-x-1/2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-2 h-2 bg-foreground rounded-sm shadow-[0_0_8px_hsl(var(--primary))]" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0.5 -left-2 w-2 h-1 bg-primary/80 rounded-sm" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0.5 left-2 w-2 h-1 bg-primary/80 rounded-sm" })
							]
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -inset-2 rounded-full border border-dashed border-muted-foreground/15" })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground text-sm",
				children: message
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				className: "flex justify-center gap-1 mt-2",
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				children: [
					0,
					1,
					2
				].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					className: "w-1.5 h-1.5 rounded-full bg-primary/60",
					animate: {
						opacity: [
							.3,
							1,
							.3
						],
						scale: [
							.8,
							1.2,
							.8
						]
					},
					transition: {
						duration: 1.2,
						repeat: Infinity,
						delay: i * .2
					}
				}, i))
			})]
		})]
	});
});
SatelliteLoader.displayName = "SatelliteLoader";
var Index = () => {
	const [focusedStation, setFocusedStation] = (0, import_react.useState)(null);
	const [isStationListOpen, setIsStationListOpen] = (0, import_react.useState)(false);
	const [isInfoModalOpen, setIsInfoModalOpen] = (0, import_react.useState)(false);
	const { t } = useTranslation();
	const { stations, geoStations, isLoadingStations, isBackgroundLoading, currentStation, isPlaying, isLoading, volume, error, play, pause, setVolume, stop, audioElement, bands, activePreset, updateBands, applyPreset, toggleFavorite, isFavorite, favoriteIds } = useGlobalPlayer();
	const handlePlay = (0, import_react.useCallback)((station) => {
		play(station);
	}, [play]);
	(0, import_react.useEffect)(() => {
		if (isPlaying && focusedStation && focusedStation.id !== currentStation?.id) handlePlay(focusedStation);
	}, [focusedStation]);
	const handleGlobeClick = (0, import_react.useCallback)(() => {
		if (focusedStation) handlePlay(focusedStation);
	}, [focusedStation, handlePlay]);
	const handleStationSelect = (0, import_react.useCallback)((station) => {
		handlePlay(station);
		setIsStationListOpen(false);
	}, [handlePlay]);
	const SITE = "https://cartofm.com";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SEOHead, {
				title: "CartoFM – Stream Live Radio Stations Worldwide",
				description: "CartoFM lets you listen to thousands of live radio stations from around the world in one place. Discover music, news, talk shows, and local broadcasts from every country.",
				jsonLd: {
					"@context": "https://schema.org",
					"@graph": [
						{
							"@type": "Organization",
							"@id": `${SITE}/#organization`,
							"name": "CartoFM",
							"url": SITE,
							"logo": {
								"@type": "ImageObject",
								"url": `${SITE}/favicon.png`
							},
							"sameAs": [SITE]
						},
						{
							"@type": "WebSite",
							"@id": `${SITE}/#website`,
							"url": SITE,
							"name": "CartoFM",
							"description": "Stream thousands of live radio stations from around the world on an interactive 3D globe.",
							"publisher": { "@id": `${SITE}/#organization` },
							"inLanguage": [
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
							],
							"potentialAction": {
								"@type": "SearchAction",
								"target": {
									"@type": "EntryPoint",
									"urlTemplate": `${SITE}/?q={search_term_string}`
								},
								"query-input": "required name=search_term_string"
							}
						},
						{
							"@type": "WebApplication",
							"@id": `${SITE}/#webapp`,
							"name": "CartoFM",
							"url": SITE,
							"description": "Stream thousands of live radio stations from around the world on an interactive 3D globe.",
							"applicationCategory": "MultimediaApplication",
							"operatingSystem": "Web",
							"offers": {
								"@type": "Offer",
								"price": "0",
								"priceCurrency": "USD"
							},
							"publisher": { "@id": `${SITE}/#organization` }
						}
					]
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
				onMenuClick: () => setIsStationListOpen(true),
				onInfoClick: () => setIsInfoModalOpen(true),
				stationCount: stations.length,
				isBackgroundLoading,
				currentStation,
				isPlaying,
				favoriteCount: favoriteIds.size,
				favoriteStations: stations.filter((s) => favoriteIds.has(s.id)),
				onStationSelect: handleStationSelect,
				isFavorite,
				onToggleFavorite: toggleFavorite
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "h-[100dvh] pt-12 md:pt-14 pb-20 md:pb-24",
				children: [
					isLoadingStations ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SatelliteLoader, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
						fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SatelliteLoader, { message: "Initializing globe…" }),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe$1, {
							stations: geoStations,
							focusedStation,
							isPlaying,
							onStationFocus: setFocusedStation,
							onGlobeClick: handleGlobeClick
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FocusCircle, {
						station: focusedStation,
						isPlaying
					}),
					!currentStation && !isLoadingStations && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: {
							opacity: 0,
							y: 20
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: { delay: 1 },
						className: "fixed bottom-28 md:bottom-32 left-0 right-0 flex justify-center pointer-events-none px-4 z-10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-muted-foreground text-sm md:text-base",
								children: [
									t("globe.rotateHint"),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-primary font-medium",
										children: t("globe.station")
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground/60 text-xs mt-1",
								children: t("globe.dragHint")
							})]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StationList, {
				stations,
				currentStation,
				isPlaying,
				onStationSelect: handleStationSelect,
				isOpen: isStationListOpen,
				onClose: () => setIsStationListOpen(false),
				isFavorite,
				onToggleFavorite: toggleFavorite,
				favoriteIds
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayerControls, {
				station: currentStation,
				isPlaying,
				isLoading,
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
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoModal, {
				isOpen: isInfoModalOpen,
				onClose: () => setIsInfoModalOpen(false)
			})
		]
	});
};
var SplitComponent = Index;
//#endregion
export { SplitComponent as component };
