export interface RadioStation {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  city: string;
  genre: string;
  streamUrl: string;
  latitude: number;
  longitude: number;
  language?: string;
  favicon?: string;
  clickcount?: number;
}

export const getCountries = (stations: RadioStation[]): string[] => {
  const countries = new Set(stations.map(s => s.country));
  return Array.from(countries).sort();
};

export const searchStations = (stations: RadioStation[], query: string): RadioStation[] => {
  const q = query.toLowerCase();
  return stations.filter(
    s =>
      s.name.toLowerCase().includes(q) ||
      s.country.toLowerCase().includes(q) ||
      s.city.toLowerCase().includes(q) ||
      s.genre.toLowerCase().includes(q)
  );
};
