export interface RadioStation {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  city: string;
  genre: string;
  tags: string[];
  streamUrl: string;
  latitude: number;
  longitude: number;
  language?: string;
  favicon?: string;
  clickcount?: number;
  votes?: number;
  codec?: string;
  bitrate?: number;
  homepage?: string;
}

export const getCountries = (stations: RadioStation[]): string[] => {
  const countries = new Set(stations.map(s => s.country));
  return Array.from(countries).sort();
};

export const getGenres = (stations: RadioStation[]): string[] => {
  const genres = new Set(stations.map(s => s.genre).filter(Boolean));
  return Array.from(genres).sort();
};

export const getLanguages = (stations: RadioStation[]): string[] => {
  const langs = new Set(stations.map(s => s.language).filter(Boolean) as string[]);
  return Array.from(langs).sort();
};

export const searchStations = (stations: RadioStation[], query: string): RadioStation[] => {
  const q = query.toLowerCase();
  return stations.filter(
    s =>
      s.name.toLowerCase().includes(q) ||
      s.country.toLowerCase().includes(q) ||
      s.city.toLowerCase().includes(q) ||
      s.genre.toLowerCase().includes(q) ||
      (s.language && s.language.toLowerCase().includes(q)) ||
      s.tags.some(t => t.toLowerCase().includes(q))
  );
};
