import { l as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-BqEV2lvN.mjs";
import { S as Heart, f as Play, n as VolumeX, p as Pause, r as Volume2, t as X, y as LoaderCircle } from "../_libs/lucide-react.mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion.mjs";
import { r as Slider, t as Equalizer } from "./RadioPlayerContext-XIOe31kg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/PlayerControls-5L8VLc7u.js
var import_jsx_runtime = require_jsx_runtime();
var PlayerControls = ({ station, isPlaying, isLoading, volume, error, onPlay, onPause, onVolumeChange, onStop, eqBands, eqActivePreset, onEqBandsChange, onEqPresetChange, isFavorite, onToggleFavorite }) => {
	const isMuted = volume === 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: station && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: {
			y: 100,
			opacity: 0
		},
		animate: {
			y: 0,
			opacity: 1
		},
		exit: {
			y: 100,
			opacity: 0
		},
		transition: {
			type: "spring",
			damping: 25,
			stiffness: 300
		},
		className: "fixed bottom-0 left-0 right-0 z-50",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "glass-strong border-t border-border/50 px-3 py-2 md:px-8 md:py-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-7xl mx-auto flex items-center gap-2 md:gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative flex-shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Equalizer, {
							bands: eqBands,
							onBandsChange: onEqBandsChange,
							activePreset: eqActivePreset,
							onPresetChange: onEqPresetChange
						})
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "hidden md:block text-destructive text-xs max-w-48 text-center truncate",
						children: error
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-1.5 md:gap-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							onClick: isPlaying ? onPause : onPlay,
							disabled: isLoading,
							className: `w-10 h-10 md:w-12 md:h-12 rounded-full ${isPlaying ? "bg-accent text-accent-foreground hover:bg-accent/90 glow-accent" : "bg-primary text-primary-foreground hover:bg-primary/90 glow-primary"} transition-all duration-300`,
							children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-5 h-5 animate-spin" }) : isPlaying ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "w-5 h-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "w-5 h-5 ml-0.5" })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5 md:gap-2 flex-shrink-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								onClick: () => onVolumeChange(isMuted ? .7 : 0),
								className: "md:hidden text-muted-foreground hover:text-foreground",
								children: isMuted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "w-5 h-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "w-5 h-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "hidden md:flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									onClick: () => onVolumeChange(isMuted ? .7 : 0),
									className: "text-muted-foreground hover:text-foreground",
									children: isMuted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "w-5 h-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "w-5 h-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
									value: [volume * 100],
									onValueChange: ([value]) => onVolumeChange(value / 100),
									max: 100,
									step: 1,
									className: "w-24"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								onClick: onToggleFavorite,
								className: isFavorite ? "text-red-500 hover:text-red-400" : "text-muted-foreground hover:text-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: `w-5 h-5 ${isFavorite ? "fill-current" : ""}` })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								onClick: onStop,
								className: "text-muted-foreground hover:text-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-5 h-5" })
							})
						]
					})
				]
			})
		})
	}) });
};
//#endregion
export { PlayerControls as t };
