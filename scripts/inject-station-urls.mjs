/**
 * Reads scripts/top-stations.json and injects <url> entries for the
 * top-N station detail pages into public/sitemap.xml between markers:
 *   <!-- STATIONS:START --> ... <!-- STATIONS:END -->
 * Also writes scripts/top-station-routes.json for the prerender script.
 */
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const BASE = 'https://cartofm.com';
const SRC = join(__dirname, 'top-stations.json');
const SITEMAP = join(ROOT, 'public', 'sitemap.xml');
const ROUTES_OUT = join(__dirname, 'top-station-routes.json');

if (!existsSync(SRC)) {
  console.warn('top-stations.json missing – run fetch-top-stations first. Skipping.');
  process.exit(0);
}

const stations = JSON.parse(readFileSync(SRC, 'utf-8'));
const entries = stations.map(s => {
  const loc = `${BASE}/stations/${s.id}`;
  return `  <url>\n    <loc>${loc}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.6</priority>\n  </url>`;
}).join('\n');

let xml = readFileSync(SITEMAP, 'utf-8');
const START = '<!-- STATIONS:START -->';
const END = '<!-- STATIONS:END -->';

if (xml.includes(START) && xml.includes(END)) {
  xml = xml.replace(
    new RegExp(`${START}[\\s\\S]*?${END}`),
    `${START}\n${entries}\n  ${END}`
  );
} else {
  // Insert before </urlset>
  xml = xml.replace(
    '</urlset>',
    `  ${START}\n${entries}\n  ${END}\n</urlset>`
  );
}
writeFileSync(SITEMAP, xml, 'utf-8');

const routes = stations.map(s => `/stations/${s.id}`);
writeFileSync(ROUTES_OUT, JSON.stringify(routes), 'utf-8');

console.log(`✅ Injected ${stations.length} station URLs into sitemap.xml`);
console.log(`✅ Wrote ${routes.length} routes to top-station-routes.json`);
