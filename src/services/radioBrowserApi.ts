import { RadioStation } from '@/data/radioStations';

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

const hasGeo = (s: RadioBrowserStation): boolean =>
  s.geo_lat != null && s.geo_lat !== 0 &&
  s.geo_long != null && s.geo_long !== 0;

const getApiServer = (index = 0): string => API_SERVERS[index % API_SERVERS.length];

const fetchBatch = async (offset: number, limit: number, serverIndex = 0): Promise<RadioBrowserStation[]> => {
  const server = getApiServer(serverIndex);
  const response = await fetch(
    `${server}/json/stations?limit=${limit}&offset=${offset}&hidebroken=true&order=clickcount&reverse=true`,
    {
      headers: { 'User-Agent': 'RadioVerseApp/1.0' },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch stations: ${response.status}`);
  }

  return response.json();
};

/** Fetch top stations quickly for initial render */
export const fetchInitialStations = async (): Promise<RadioStation[]> => {
  const data = await fetchBatch(0, 5000);
  return data.filter(isValidStation).map(mapStation);
};

/** 
 * Progressively load ALL remaining stations in background batches.
 * Continues on failures instead of breaking.
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

  while (consecutiveFailures < MAX_CONSECUTIVE_FAILURES) {
    try {
      const data = await fetchBatch(offset, BATCH_SIZE, serverIndex);
      consecutiveFailures = 0; // reset on success
      
      if (data.length === 0) break;

      const validStations = data.filter(isValidStation).map(mapStation);
      
      if (validStations.length > 0) {
        onBatch(validStations);
        totalLoaded += validStations.length;
      }

      if (data.length < BATCH_SIZE) break;
      
      offset += BATCH_SIZE;
      serverIndex++;
      
      await new Promise(r => setTimeout(r, 300));
    } catch (err) {
      console.warn(`Batch at offset ${offset} failed, trying next server...`, err);
      consecutiveFailures++;
      serverIndex++;
      
      // Try same offset with different server
      try {
        const data = await fetchBatch(offset, BATCH_SIZE, serverIndex);
        consecutiveFailures = 0;
        const validStations = data.filter(isValidStation).map(mapStation);
        if (validStations.length > 0) {
          onBatch(validStations);
          totalLoaded += validStations.length;
        }
        if (data.length < BATCH_SIZE) break;
        offset += BATCH_SIZE;
        serverIndex++;
        await new Promise(r => setTimeout(r, 300));
      } catch {
        console.warn(`Skipping batch at offset ${offset}, continuing...`);
        offset += BATCH_SIZE;
        serverIndex++;
        // Don't break — try next offset
      }
    }
  }

  onComplete?.(totalLoaded);
};

/** Check if a station has valid geo coordinates for globe display */
export const stationHasGeo = (s: RadioStation): boolean =>
  s.latitude !== 0 && s.longitude !== 0;

export const fetchRadioStations = fetchInitialStations;
