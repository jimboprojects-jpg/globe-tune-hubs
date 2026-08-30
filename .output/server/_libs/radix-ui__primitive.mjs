//#region node_modules/@radix-ui/react-slider/node_modules/@radix-ui/primitive/dist/index.mjs
var __defProp$2 = Object.defineProperty;
var __name$2 = (target, value) => __defProp$2(target, "name", {
	value,
	configurable: true
});
var canUseDOM$2 = !!(typeof window !== "undefined" && window.document && window.document.createElement);
function composeEventHandlers$3(originalEventHandler, ourEventHandler, { checkForDefaultPrevented = true } = {}) {
	return /* @__PURE__ */ __name$2(function handleEvent(event) {
		originalEventHandler?.(event);
		if (checkForDefaultPrevented === false || !event || !event.defaultPrevented) return ourEventHandler?.(event);
	}, "handleEvent");
}
__name$2(composeEventHandlers$3, "composeEventHandlers");
function getOwnerWindow$2(element) {
	if (!canUseDOM$2) throw new Error("Cannot access window outside of the DOM");
	return element?.ownerDocument?.defaultView ?? window;
}
__name$2(getOwnerWindow$2, "getOwnerWindow");
function getOwnerDocument$2(element) {
	if (!canUseDOM$2) throw new Error("Cannot access document outside of the DOM");
	return element?.ownerDocument ?? document;
}
__name$2(getOwnerDocument$2, "getOwnerDocument");
function getActiveElement$2(node, activeDescendant = false) {
	const { activeElement } = getOwnerDocument$2(node);
	if (!activeElement?.nodeName) return null;
	if (isFrame$2(activeElement) && activeElement.contentDocument) return getActiveElement$2(activeElement.contentDocument.body, activeDescendant);
	if (activeDescendant) {
		const id = activeElement.getAttribute("aria-activedescendant");
		if (id) {
			const element = getOwnerDocument$2(activeElement).getElementById(id);
			if (element) return element;
		}
	}
	return activeElement;
}
__name$2(getActiveElement$2, "getActiveElement");
function isFrame$2(element) {
	return element.tagName === "IFRAME";
}
__name$2(isFrame$2, "isFrame");
//#endregion
//#region node_modules/@radix-ui/react-scroll-area/node_modules/@radix-ui/primitive/dist/index.mjs
var __defProp$1 = Object.defineProperty;
var __name$1 = (target, value) => __defProp$1(target, "name", {
	value,
	configurable: true
});
var canUseDOM$1 = !!(typeof window !== "undefined" && window.document && window.document.createElement);
function composeEventHandlers$2(originalEventHandler, ourEventHandler, { checkForDefaultPrevented = true } = {}) {
	return /* @__PURE__ */ __name$1(function handleEvent(event) {
		originalEventHandler?.(event);
		if (checkForDefaultPrevented === false || !event || !event.defaultPrevented) return ourEventHandler?.(event);
	}, "handleEvent");
}
__name$1(composeEventHandlers$2, "composeEventHandlers");
function getOwnerWindow$1(element) {
	if (!canUseDOM$1) throw new Error("Cannot access window outside of the DOM");
	return element?.ownerDocument?.defaultView ?? window;
}
__name$1(getOwnerWindow$1, "getOwnerWindow");
function getOwnerDocument$1(element) {
	if (!canUseDOM$1) throw new Error("Cannot access document outside of the DOM");
	return element?.ownerDocument ?? document;
}
__name$1(getOwnerDocument$1, "getOwnerDocument");
function getActiveElement$1(node, activeDescendant = false) {
	const { activeElement } = getOwnerDocument$1(node);
	if (!activeElement?.nodeName) return null;
	if (isFrame$1(activeElement) && activeElement.contentDocument) return getActiveElement$1(activeElement.contentDocument.body, activeDescendant);
	if (activeDescendant) {
		const id = activeElement.getAttribute("aria-activedescendant");
		if (id) {
			const element = getOwnerDocument$1(activeElement).getElementById(id);
			if (element) return element;
		}
	}
	return activeElement;
}
__name$1(getActiveElement$1, "getActiveElement");
function isFrame$1(element) {
	return element.tagName === "IFRAME";
}
__name$1(isFrame$1, "isFrame");
//#endregion
//#region node_modules/@radix-ui/react-dismissable-layer/node_modules/@radix-ui/primitive/dist/index.mjs
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", {
	value,
	configurable: true
});
var canUseDOM = !!(typeof window !== "undefined" && window.document && window.document.createElement);
function composeEventHandlers$1(originalEventHandler, ourEventHandler, { checkForDefaultPrevented = true } = {}) {
	return /* @__PURE__ */ __name(function handleEvent(event) {
		originalEventHandler?.(event);
		if (checkForDefaultPrevented === false || !event || !event.defaultPrevented) return ourEventHandler?.(event);
	}, "handleEvent");
}
__name(composeEventHandlers$1, "composeEventHandlers");
function getOwnerWindow(element) {
	if (!canUseDOM) throw new Error("Cannot access window outside of the DOM");
	return element?.ownerDocument?.defaultView ?? window;
}
__name(getOwnerWindow, "getOwnerWindow");
function getOwnerDocument(element) {
	if (!canUseDOM) throw new Error("Cannot access document outside of the DOM");
	return element?.ownerDocument ?? document;
}
__name(getOwnerDocument, "getOwnerDocument");
function getActiveElement(node, activeDescendant = false) {
	const { activeElement } = getOwnerDocument(node);
	if (!activeElement?.nodeName) return null;
	if (isFrame(activeElement) && activeElement.contentDocument) return getActiveElement(activeElement.contentDocument.body, activeDescendant);
	if (activeDescendant) {
		const id = activeElement.getAttribute("aria-activedescendant");
		if (id) {
			const element = getOwnerDocument(activeElement).getElementById(id);
			if (element) return element;
		}
	}
	return activeElement;
}
__name(getActiveElement, "getActiveElement");
function isFrame(element) {
	return element.tagName === "IFRAME";
}
__name(isFrame, "isFrame");
//#endregion
//#region node_modules/@radix-ui/primitive/dist/index.mjs
function composeEventHandlers(originalEventHandler, ourEventHandler, { checkForDefaultPrevented = true } = {}) {
	return function handleEvent(event) {
		originalEventHandler?.(event);
		if (checkForDefaultPrevented === false || !event.defaultPrevented) return ourEventHandler?.(event);
	};
}
//#endregion
export { composeEventHandlers$3 as i, composeEventHandlers$1 as n, composeEventHandlers$2 as r, composeEventHandlers as t };
