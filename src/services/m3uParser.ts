import { RadioStation } from '@/data/radioStations';

interface ParsedM3UEntry {
  name: string;
  streamUrl: string;
  playlist: string; // genre (radio.net) or city (radio.garden)
}

/**
 * Parse an m3u playlist string into entries.
 * Handles #PLAYLIST for grouping and #EXTINF for station metadata.
 */
export const parseM3U = (content: string): ParsedM3UEntry[] => {
  const lines = content.split('\n');
  const entries: ParsedM3UEntry[] = [];
  let currentPlaylist = '';
  let currentName = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.startsWith('#PLAYLIST:')) {
      currentPlaylist = line.substring('#PLAYLIST:'.length).trim().replace(/\.m3u$/i, '');
    } else if (line.startsWith('#EXTINF:')) {
      // Format: #EXTINF:-1,StationName
      const commaIdx = line.indexOf(',');
      currentName = commaIdx >= 0 ? line.substring(commaIdx + 1).trim() : '';
    } else if (line && !line.startsWith('#')) {
      // This is a URL line
      if (currentName) {
        entries.push({
          name: currentName.replace(/_/g, ' '),
          streamUrl: line,
          playlist: currentPlaylist.replace(/_/g, ' '),
        });
      }
      currentName = '';
    }
  }

  return entries;
};

/**
 * Convert radio.net m3u entries to RadioStation objects.
 * playlist = genre name
 */
export const radioNetEntriesToStations = (entries: ParsedM3UEntry[]): RadioStation[] =>
  entries.map((e, i) => ({
    id: `rnet-${i}-${hashCode(e.streamUrl)}`,
    name: e.name,
    country: '',
    countryCode: '',
    city: '',
    genre: e.playlist || 'Radio',
    streamUrl: e.streamUrl,
    latitude: 0,
    longitude: 0,
  }));

/**
 * Convert radio.garden m3u entries to RadioStation objects.
 * playlist = city name
 */
export const radioGardenEntriesToStations = (entries: ParsedM3UEntry[]): RadioStation[] =>
  entries.map((e, i) => ({
    id: `rgdn-${i}-${hashCode(e.streamUrl)}`,
    name: e.name,
    country: '',
    countryCode: '',
    city: e.playlist || '',
    genre: 'Radio',
    streamUrl: e.streamUrl,
    latitude: 0,
    longitude: 0,
  }));

/** Simple string hash for generating unique-ish IDs */
const hashCode = (s: string): string => {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h).toString(36);
};
