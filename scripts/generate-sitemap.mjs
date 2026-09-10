/**
 * Generates localized sitemaps for CartoFM.
 *
 * Output:
 *   public/sitemap.xml          – sitemap index
 *   public/sitemap-pages.xml    – landing/country/genre/blog pages, one <url> per language
 *   public/sitemap-stations.xml – station pages (English loc + hreflang alternates)
 *
 * Source of paths: scripts/base-paths.json (non-station app paths)
 * and scripts/top-stations.json (top stations by clickcount).
 */
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const BASE = 'https://cartofm.com';

const LANGS = ['en', 'fr', 'es', 'de', 'sw', 'zh', 'ru', 'hi', 'ar', 'pt', 'id'];
const HREFLANG = {
  en: 'en', fr: 'fr', es: 'es', de: 'de', sw: 'sw', zh: 'zh-Hans',
  ru: 'ru', hi: 'hi', ar: 'ar', pt: 'pt', id: 'id',
};

const withLocale = (path, lang) => {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (lang === 'en') return clean;
  return clean === '/' ? `/${lang}` : `/${lang}${clean}`;
};

const alternates = (path) => {
  const out = LANGS.map(
    (l) => `    <xhtml:link rel="alternate" hreflang="${HREFLANG[l]}" href="${BASE}${withLocale(path, l)}" />`
  );
  out.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE}${withLocale(path, 'en')}" />`);
  return out.join('\n');
};

const urlEntry = (loc, path, changefreq, priority) =>
  `  <url>\n    <loc>${BASE}${loc}</loc>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n${alternates(path)}\n  </url>`;

const wrap = (entries) =>
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.join('\n')}\n</urlset>\n`;

const priorityFor = (path) => {
  if (path === '/') return '1.0';
  if (/^\/(countries|genres|blog)$/.test(path)) return '0.9';
  if (/^\/(countries|genres)\//.test(path)) return '0.8';
  if (path.startsWith('/blog/')) return '0.7';
  return '0.5';
};
const freqFor = (path) => (path === '/' ? 'daily' : path.startsWith('/blog') ? 'monthly' : 'weekly');

// --- pages -------------------------------------------------------------
const basePaths = JSON.parse(readFileSync(join(__dirname, 'base-paths.json'), 'utf-8'));
const pageEntries = [];
for (const path of basePaths) {
  for (const lang of LANGS) {
    pageEntries.push(urlEntry(withLocale(path, lang), path, freqFor(path), priorityFor(path)));
  }
}
writeFileSync(join(ROOT, 'public', 'sitemap-pages.xml'), wrap(pageEntries), 'utf-8');

// --- stations ----------------------------------------------------------
const stationsFile = join(__dirname, 'top-stations.json');
const stations = existsSync(stationsFile) ? JSON.parse(readFileSync(stationsFile, 'utf-8')) : [];
const stationEntries = stations.map((s) => {
  const path = `/stations/${s.id}`;
  return urlEntry(path, path, 'weekly', '0.6');
});
writeFileSync(join(ROOT, 'public', 'sitemap-stations.xml'), wrap(stationEntries), 'utf-8');

// --- index -------------------------------------------------------------
const today = new Date().toISOString().slice(0, 10);
const index = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${BASE}/sitemap-pages.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE}/sitemap-stations.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>
`;
writeFileSync(join(ROOT, 'public', 'sitemap.xml'), index, 'utf-8');

console.log(`✅ pages: ${pageEntries.length} urls (${basePaths.length} paths x ${LANGS.length} langs)`);
console.log(`✅ stations: ${stationEntries.length} urls`);
