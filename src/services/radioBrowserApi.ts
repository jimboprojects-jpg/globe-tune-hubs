import { RadioStation } from '@/data/radioStations';

// Use multiple API servers for reliability
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
  geo_lat: number;
  geo_long: number;
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
  latitude: s.geo_lat,
  longitude: s.geo_long,
  language: s.language,
  favicon: s.favicon,
  clickcount: s.clickcount,
});

const isValidStation = (s: RadioBrowserStation): boolean =>
  s.geo_lat != null && s.geo_lat !== 0 &&
  s.geo_long != null && s.geo_long !== 0 &&
  s.name.trim().length > 0;

const getApiServer = (index = 0): string => API_SERVERS[index % API_SERVERS.length];

const fetchBatch = async (offset: number, limit: number, serverIndex = 0): Promise<RadioBrowserStation[]> => {
  const server = getApiServer(serverIndex);
  const response = await fetch(
    `${server}/json/stations?limit=${limit}&offset=${offset}&has_geo_info=true&hidebroken=true&order=clickcount&reverse=true`,
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
 * Progressively load all remaining stations in background batches.
 * Calls onBatch with each new batch of stations as they arrive.
 */
export const fetchRemainingStations = async (
  onBatch: (stations: RadioStation[]) => void,
  onComplete?: (total: number) => void,
): Promise<void> => {
  const BATCH_SIZE = 10000;
  let offset = 5000; // start after initial load
  let totalLoaded = 0;
  let serverIndex = 0;

  while (true) {
    try {
      const data = await fetchBatch(offset, BATCH_SIZE, serverIndex);
      
      if (data.length === 0) break; // no more stations

      const validStations = data.filter(isValidStation).map(mapStation);
      
      if (validStations.length > 0) {
        onBatch(validStations);
        totalLoaded += validStations.length;
      }

      if (data.length < BATCH_SIZE) break; // last batch
      
      offset += BATCH_SIZE;
      serverIndex++; // rotate servers to distribute load
      
      // Small delay between batches to avoid hammering the API
      await new Promise(r => setTimeout(r, 500));
    } catch (err) {
      console.warn(`Batch at offset ${offset} failed, retrying with different server...`, err);
      serverIndex++;
      // Retry once with different server, then skip
      try {
        const data = await fetchBatch(offset, BATCH_SIZE, serverIndex);
        const validStations = data.filter(isValidStation).map(mapStation);
        if (validStations.length > 0) {
          onBatch(validStations);
          totalLoaded += validStations.length;
        }
        if (data.length < BATCH_SIZE) break;
        offset += BATCH_SIZE;
      } catch {
        console.warn(`Skipping batch at offset ${offset}`);
        break;
      }
    }
  }

  onComplete?.(totalLoaded);
};

// Keep backward compat
export const fetchRadioStations = fetchInitialStations;
