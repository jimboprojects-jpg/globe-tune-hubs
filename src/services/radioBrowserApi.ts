import { RadioStation } from '@/data/radioStations';
import { parseM3U, radioNetEntriesToStations, radioGardenEntriesToStations } from './m3uParser';

// ─── Radio Browser API ───────────────────────────────────────────────

const API_SERVERS = [
  'https://de1.api.radio-browser.info',
  'https://nl1.api.radio-browser.info',
  'https://at1.api.radio-browser.info',
];

interface RadioBrowserStation {
  stationuuid: string;
  name: string;
  url: string;
  url_resolved: string;
  country: string;
  countrycode: string;
  state: string;
  tags: string;
  language: string;
  geo_lat: number | null;
  geo_long: number | null;
  favicon: string;
  clickcount: number;
}

const mapStation = (s: RadioBrowserStation): RadioStation => ({
  id: s.stationuuid,
  name: s.name.trim(),
  country: s.country,
  countryCode: s.countrycode,
  city: s.state || s.country,
  genre: s.tags ? s.tags.split(',')[0].trim() : 'Radio',
  streamUrl: s.url_resolved || s.url,
  latitude: s.geo_lat ?? 0,
  longitude: s.geo_long ?? 0,
  language: s.language,
  favicon: s.favicon,
  clickcount: s.clickcount,
});

const isValidStation = (s: RadioBrowserStation): boolean =>
  s.name.trim().length > 0;

const getApiServer = (index = 0): string => API_SERVERS[index % API_SERVERS.length];

const fetchBatch = async (offset: number, limit: number, serverIndex = 0): Promise<RadioBrowserStation[]> => {
  const server = getApiServer(serverIndex);
  const response = await fetch(
    `${server}/json/stations?limit=${limit}&offset=${offset}&hidebroken=true&order=clickcount&reverse=true`,
    { headers: { 'User-Agent': 'RadioVerseApp/1.0' } }
  );
  if (!response.ok) throw new Error(`Failed to fetch stations: ${response.status}`);
  return response.json();
};

// ─── M3U Sources ─────────────────────────────────────────────────────

const M3U_URLS = {
  radioNet: 'https://raw.githubusercontent.com/jimboprojects-jpg/m3u-radio-music-playlists/main/radio.net/---everything-full.m3u',
  radioGarden: 'https://raw.githubusercontent.com/jimboprojects-jpg/m3u-radio-music-playlists/main/radio.garden/---everything-full.m3u',
};

const fetchM3UStations = async (
  url: string,
  converter: (entries: ReturnType<typeof parseM3U>) => RadioStation[]
): Promise<RadioStation[]> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.warn(`Failed to fetch m3u from ${url}: ${response.status}`);
      return [];
    }
    const text = await response.text();
    const entries = parseM3U(text);
    console.log(`Parsed ${entries.length} entries from ${url.split('/').pop()}`);
    return converter(entries);
  } catch (err) {
    console.warn(`Error fetching m3u from ${url}:`, err);
    return [];
  }
};

// ─── Deduplication ───────────────────────────────────────────────────

/** Normalize a stream URL for deduplication (strip protocol, trailing slash, query params) */
const normalizeUrl = (url: string): string => {
  try {
    const u = new URL(url);
    return (u.host + u.pathname).replace(/\/+$/, '').toLowerCase();
  } catch {
    return url.toLowerCase().replace(/^https?:\/\//, '').replace(/\/+$/, '');
  }
};

/**
 * Merge stations from multiple sources, deduplicating by stream URL.
 * Radio-browser stations take priority (they have richer metadata).
 */
const mergeStations = (
  radioBrowserStations: RadioStation[],
  m3uStations: RadioStation[]
): RadioStation[] => {
  const seen = new Set<string>();

  // Index all radio-browser URLs first (they're the priority source)
  for (const s of radioBrowserStations) {
    seen.add(normalizeUrl(s.streamUrl));
  }

  // Add unique m3u stations
  const unique: RadioStation[] = [];
  for (const s of m3uStations) {
    const key = normalizeUrl(s.streamUrl);
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(s);
    }
  }

  console.log(`Merge: ${radioBrowserStations.length} radio-browser + ${unique.length} unique m3u stations = ${radioBrowserStations.length + unique.length} total`);
  return [...radioBrowserStations, ...unique];
};

// ─── Public API ──────────────────────────────────────────────────────

/** Fetch top stations quickly for initial render (radio-browser only) */
export const fetchInitialStations = async (): Promise<RadioStation[]> => {
  const data = await fetchBatch(0, 5000);
  return data.filter(isValidStation).map(mapStation);
};

/**
 * Progressively load ALL remaining stations in background batches,
 * then merge in m3u sources.
 */
export const fetchRemainingStations = async (
  onBatch: (stations: RadioStation[]) => void,
  onComplete?: (total: number) => void,
): Promise<void> => {
  const BATCH_SIZE = 10000;
  let offset = 5000;
  let totalLoaded = 0;
  let serverIndex = 0;
  let consecutiveFailures = 0;
  const MAX_CONSECUTIVE_FAILURES = 3;

  // Collect all radio-browser stations for dedup later
  const allRadioBrowserUrls = new Set<string>();

  // Start m3u fetches in parallel with radio-browser loading
  const m3uPromise = Promise.all([
    fetchM3UStations(M3U_URLS.radioNet, radioNetEntriesToStations),
    fetchM3UStations(M3U_URLS.radioGarden, radioGardenEntriesToStations),
  ]);

  // Load remaining radio-browser batches
  while (consecutiveFailures < MAX_CONSECUTIVE_FAILURES) {
    try {
      const data = await fetchBatch(offset, BATCH_SIZE, serverIndex);
      consecutiveFailures = 0;
      if (data.length === 0) break;

      const validStations = data.filter(isValidStation).map(mapStation);
      if (validStations.length > 0) {
        onBatch(validStations);
        totalLoaded += validStations.length;
        validStations.forEach(s => allRadioBrowserUrls.add(normalizeUrl(s.streamUrl)));
      }

      if (data.length < BATCH_SIZE) break;
      offset += BATCH_SIZE;
      serverIndex++;
      await new Promise(r => setTimeout(r, 300));
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
          validStations.forEach(s => allRadioBrowserUrls.add(normalizeUrl(s.streamUrl)));
        }
        if (data.length < BATCH_SIZE) break;
        offset += BATCH_SIZE;
        serverIndex++;
        await new Promise(r => setTimeout(r, 300));
      } catch {
        console.warn(`Skipping batch at offset ${offset}, continuing...`);
        offset += BATCH_SIZE;
        serverIndex++;
      }
    }
  }

  // Now merge in m3u stations (they've been loading in parallel)
  try {
    const [radioNetStations, radioGardenStations] = await m3uPromise;
    const allM3u = [...radioNetStations, ...radioGardenStations];

    // Filter out duplicates that already exist in radio-browser
    const uniqueM3u = allM3u.filter(s => !allRadioBrowserUrls.has(normalizeUrl(s.streamUrl)));

    if (uniqueM3u.length > 0) {
      // Deduplicate within m3u sources themselves
      const seen = new Set<string>();
      const deduped: RadioStation[] = [];
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
    console.warn('Failed to load m3u stations:', err);
  }

  onComplete?.(totalLoaded);
};

/** Check if a station has valid geo coordinates for globe display */
export const stationHasGeo = (s: RadioStation): boolean =>
  s.latitude !== 0 && s.longitude !== 0;

export const fetchRadioStations = fetchInitialStations;
