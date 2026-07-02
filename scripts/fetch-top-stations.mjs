/**
 * Fetch the top N radio stations by clickcount from radio-browser and
 * cache them locally so the sitemap injector and prerender step have
 * a stable list. Falls back silently on network errors so builds don't
 * break offline.
 */
import { writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, 'top-stations.json');
const LIMIT = 1000;
const SERVERS = [
  'https://de1.api.radio-browser.info',
  'https://nl1.api.radio-browser.info',
  'https://at1.api.radio-browser.info',
];

async function fetchTop() {
  for (const s of SERVERS) {
    try {
      const r = await fetch(
        `${s}/json/stations?limit=${LIMIT}&offset=0&hidebroken=true&order=clickcount&reverse=true`,
        { headers: { 'User-Agent': 'CartoFMApp/1.0' } }
      );
      if (!r.ok) continue;
      const data = await r.json();
      return data
        .filter(x => x.stationuuid && x.name)
        .map(x => ({ id: x.stationuuid, name: x.name.trim(), clickcount: x.clickcount || 0 }));
    } catch (e) {
      console.warn(`  server ${s} failed:`, e.message);
    }
  }
  return null;
}

const stations = await fetchTop();
if (!stations || stations.length === 0) {
  if (existsSync(OUT)) {
    console.warn('⚠ Fetch failed – keeping existing top-stations.json cache.');
    process.exit(0);
  }
  console.warn('⚠ Fetch failed and no cache – writing empty list.');
  writeFileSync(OUT, '[]', 'utf-8');
  process.exit(0);
}

writeFileSync(OUT, JSON.stringify(stations), 'utf-8');
console.log(`✅ Cached ${stations.length} top stations to top-stations.json`);
