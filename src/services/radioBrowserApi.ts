import { RadioStation } from '@/data/radioStations';

const API_BASE = 'https://de1.api.radio-browser.info';

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

export const fetchRadioStations = async (): Promise<RadioStation[]> => {
  const response = await fetch(
    `${API_BASE}/json/stations?limit=5000&has_geo_info=true&hidebroken=true&order=clickcount&reverse=true`,
    {
      headers: {
        'User-Agent': 'RadioVerseApp/1.0',
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch stations: ${response.status}`);
  }

  const data: RadioBrowserStation[] = await response.json();

  return data
    .filter(s => s.geo_lat != null && s.geo_lat !== 0 && s.geo_long != null && s.geo_long !== 0 && s.name.trim())
    .map(mapStation);
};
