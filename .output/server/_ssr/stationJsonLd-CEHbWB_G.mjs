//#region node_modules/.nitro/vite/services/ssr/assets/stationJsonLd-CEHbWB_G.js
var SITE = "https://cartofm.com";
/**
* Build a schema.org RadioBroadcastService node for a single station.
* Combines RadioBroadcastService + RadioStation semantics so search engines
* can surface name, operator, language, area served, logo, and the live
* stream URL (via a ListenAction).
*/
function buildStationJsonLd(station, pageUrl) {
	const stationUrl = `${pageUrl}#station-${station.id}`;
	const node = {
		"@type": ["RadioBroadcastService", "RadioStation"],
		"@id": stationUrl,
		name: station.name,
		url: stationUrl,
		broadcastDisplayName: station.name,
		genre: station.genre,
		areaServed: {
			"@type": "Country",
			name: station.country,
			...station.countryCode ? { identifier: station.countryCode.toUpperCase() } : {}
		},
		broadcaster: {
			"@type": "Organization",
			name: station.name
		},
		potentialAction: {
			"@type": "ListenAction",
			target: [{
				"@type": "EntryPoint",
				urlTemplate: station.streamUrl,
				contentType: "audio/mpeg",
				actionPlatform: [
					"https://schema.org/DesktopWebPlatform",
					"https://schema.org/MobileWebPlatform",
					"https://schema.org/IOSPlatform",
					"https://schema.org/AndroidPlatform"
				],
				inLanguage: station.language || "en"
			}, {
				"@type": "EntryPoint",
				urlTemplate: pageUrl,
				actionPlatform: ["https://schema.org/DesktopWebPlatform", "https://schema.org/MobileWebPlatform"]
			}],
			expectsAcceptanceOf: {
				"@type": "Offer",
				category: "free",
				price: "0",
				priceCurrency: "USD",
				availability: "https://schema.org/InStock",
				eligibleRegion: {
					"@type": "Country",
					name: station.country
				},
				availabilityStarts: "00:00:00+00:00",
				availabilityEnds: "23:59:59+00:00"
			}
		},
		audio: {
			"@type": "AudioObject",
			contentUrl: station.streamUrl,
			encodingFormat: "audio/mpeg",
			isLiveBroadcast: true,
			isAccessibleForFree: true,
			requiresSubscription: false,
			...station.language ? { inLanguage: station.language } : {}
		}
	};
	if (station.language) node.inLanguage = station.language;
	if (station.favicon) {
		node.logo = station.favicon;
		node.image = station.favicon;
	}
	if (station.city) node.location = {
		"@type": "Place",
		name: station.city,
		address: {
			"@type": "PostalAddress",
			addressLocality: station.city,
			addressCountry: station.countryCode?.toUpperCase() || station.country
		},
		...station.latitude && station.longitude ? { geo: {
			"@type": "GeoCoordinates",
			latitude: station.latitude,
			longitude: station.longitude
		} } : {}
	};
	const sameAs = [];
	if (station.favicon) try {
		const origin = new URL(station.favicon).origin;
		if (origin && origin !== SITE) sameAs.push(origin);
	} catch {}
	if (sameAs.length) node.sameAs = sameAs;
	return node;
}
/**
* Build an ItemList wrapping up to `limit` RadioBroadcastService nodes,
* ranked by popularity (clickcount) so the most relevant stations appear
* first in rich-results candidates.
*/
function buildStationItemList(stations, pageUrl, limit = 50) {
	const ranked = [...stations].sort((a, b) => (b.clickcount || 0) - (a.clickcount || 0)).slice(0, limit);
	return {
		"@type": "ItemList",
		itemListOrder: "https://schema.org/ItemListOrderDescending",
		numberOfItems: ranked.length,
		itemListElement: ranked.map((station, index) => ({
			"@type": "ListItem",
			position: index + 1,
			item: buildStationJsonLd(station, pageUrl)
		}))
	};
}
/**
* Build a full @graph for a dedicated station page.
* Includes WebPage, BreadcrumbList, and a rich RadioStation / RadioBroadcastService /
* MusicGroup node with sameAs and a ListenAction pointing at the live stream.
*/
function buildStationPageJsonLd(station, pageUrl) {
	const stationNode = buildStationJsonLd(station, pageUrl);
	stationNode["@type"] = [
		"RadioBroadcastService",
		"RadioStation",
		"MusicGroup"
	];
	stationNode["@id"] = pageUrl;
	stationNode.url = pageUrl;
	stationNode.mainEntityOfPage = pageUrl;
	const breadcrumb = {
		"@type": "BreadcrumbList",
		itemListElement: [
			{
				"@type": "ListItem",
				position: 1,
				name: "Home",
				item: `${SITE}/`
			},
			{
				"@type": "ListItem",
				position: 2,
				name: station.country,
				item: `${SITE}/countries/${station.countryCode?.toUpperCase() || ""}`
			},
			{
				"@type": "ListItem",
				position: 3,
				name: station.name,
				item: pageUrl
			}
		]
	};
	return {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "WebPage",
				"@id": `${pageUrl}#webpage`,
				url: pageUrl,
				name: `${station.name} – Listen Live`,
				inLanguage: station.language || "en",
				isPartOf: {
					"@type": "WebSite",
					name: "CartoFM",
					url: SITE
				},
				primaryImageOfPage: station.favicon ? {
					"@type": "ImageObject",
					url: station.favicon
				} : void 0,
				mainEntity: { "@id": pageUrl },
				breadcrumb
			},
			breadcrumb,
			stationNode
		]
	};
}
//#endregion
export { buildStationPageJsonLd as n, buildStationItemList as t };
