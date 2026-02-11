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
  geo_lat: number;
  geo_long: number;
  favicon: string;
  clickcount: number;
  votes: number;
  codec: string;
  bitrate: number;
  homepage: string;
  lastcheckok: number;
}

const mapStation = (s: RadioBrowserStation): RadioStation => ({
  id: s.stationuuid,
  name: s.name.trim(),
  country: s.country,
  countryCode: s.countrycode,
  city: s.state || s.country,
  genre: s.tags ? s.tags.split(',')[0].trim() : 'Radio',
  tags: s.tags ? s.tags.split(',').map(t => t.trim()).filter(Boolean).slice(0, 5) : [],
  streamUrl: s.url_resolved || s.url,
  latitude: s.geo_lat,
  longitude: s.geo_long,
  language: s.language || undefined,
  favicon: s.favicon || undefined,
  clickcount: s.clickcount,
  votes: s.votes,
  codec: s.codec || undefined,
  bitrate: s.bitrate || undefined,
  homepage: s.homepage || undefined,
});

const fetchFromServer = async (baseUrl: string): Promise<RadioBrowserStation[]> => {
  const response = await fetch(
    `${baseUrl}/json/stations?limit=50000&has_geo_info=true&hidebroken=true&lastcheckok=1&order=clickcount&reverse=true`,
    {
      headers: { 'User-Agent': 'RadioVerseApp/1.0' },
    }
  );
  if (!response.ok) throw new Error(`Failed: ${response.status}`);
  return response.json();
};

export const fetchRadioStations = async (): Promise<RadioStation[]> => {
  let data: RadioBrowserStation[] = [];

  // Try servers in order (failover)
  for (const server of API_SERVERS) {
    try {
      data = await fetchFromServer(server);
      break;
    } catch {
      continue;
    }
  }

  if (data.length === 0) {
    throw new Error('All RadioBrowser servers failed');
  }

  return data
    .filter(s => s.geo_lat !== 0 && s.geo_long !== 0 && s.name.trim())
    .map(mapStation);
};
