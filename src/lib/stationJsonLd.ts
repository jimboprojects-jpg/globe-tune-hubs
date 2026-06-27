import type { RadioStation } from '@/data/radioStations';

const SITE = 'https://cartofm.com';

/**
 * Build a schema.org RadioBroadcastService node for a single station.
 * Combines RadioBroadcastService + RadioStation semantics so search engines
 * can surface name, operator, language, area served, logo, and the live
 * stream URL (via a ListenAction).
 */
export function buildStationJsonLd(station: RadioStation, pageUrl: string) {
  const stationUrl = `${pageUrl}#station-${station.id}`;
  const node: Record<string, unknown> = {
    '@type': ['RadioBroadcastService', 'RadioStation'],
    '@id': stationUrl,
    name: station.name,
    url: stationUrl,
    broadcastDisplayName: station.name,
    genre: station.genre,
    areaServed: {
      '@type': 'Country',
      name: station.country,
      ...(station.countryCode ? { identifier: station.countryCode.toUpperCase() } : {}),
    },
    broadcaster: {
      '@type': 'Organization',
      name: station.name,
    },
    potentialAction: {
      '@type': 'ListenAction',
      target: station.streamUrl,
      expectsAcceptanceOf: {
        '@type': 'Offer',
        category: 'free',
        eligibleRegion: { '@type': 'Country', name: station.country },
      },
    },
  };

  if (station.language) {
    node.inLanguage = station.language;
  }
  if (station.favicon) {
    node.logo = station.favicon;
    node.image = station.favicon;
  }
  if (station.city) {
    node.location = {
      '@type': 'Place',
      name: station.city,
      address: {
        '@type': 'PostalAddress',
        addressLocality: station.city,
        addressCountry: station.countryCode?.toUpperCase() || station.country,
      },
      ...(station.latitude && station.longitude
        ? {
            geo: {
              '@type': 'GeoCoordinates',
              latitude: station.latitude,
              longitude: station.longitude,
            },
          }
        : {}),
    };
  }
  const sameAs: string[] = [];
  if (station.favicon) {
    try {
      const origin = new URL(station.favicon).origin;
      if (origin && origin !== SITE) sameAs.push(origin);
    } catch {
      /* ignore */
    }
  }
  if (sameAs.length) node.sameAs = sameAs;

  return node;
}

/**
 * Build an ItemList wrapping up to `limit` RadioBroadcastService nodes,
 * ranked by popularity (clickcount) so the most relevant stations appear
 * first in rich-results candidates.
 */
export function buildStationItemList(
  stations: RadioStation[],
  pageUrl: string,
  limit = 50
) {
  const ranked = [...stations]
    .sort((a, b) => (b.clickcount || 0) - (a.clickcount || 0))
    .slice(0, limit);

  return {
    '@type': 'ItemList',
    itemListOrder: 'https://schema.org/ItemListOrderDescending',
    numberOfItems: ranked.length,
    itemListElement: ranked.map((station, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: buildStationJsonLd(station, pageUrl),
    })),
  };
}
