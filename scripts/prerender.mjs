/**
 * Post-build prerender script.
 * Spins up a static server for the Vite `dist` folder,
 * visits every route with Puppeteer, and writes the rendered HTML back.
 */
import { createServer } from 'http';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, extname, dirname } from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, '..', 'dist');
const PORT = 4173;

// ── Route list ──────────────────────────────────────────────────────
const GENRES = [
  'pop','rock','jazz','classical','electronic','hiphop',
  'country','news','rnb','reggae','latin','ambient',
];

const BLOG_SLUGS = [
  'best-jazz-radio-stations-worldwide',
  'how-radio-shaped-music-culture',
  'listen-to-radio-in-japan',
  'african-radio-stations-guide',
  'best-classical-music-radio-stations',
  'latin-american-radio-culture',
  'internet-radio-vs-spotify-why-live-radio-matters',
  'how-to-discover-new-music-with-world-radio',
  'indian-radio-stations-bollywood-classical-regional',
  'european-radio-stations-hidden-gems',
  'best-radio-stations-for-studying-and-focus',
  'middle-eastern-radio-guide',
];

const COUNTRIES = [
  'AD','AE','AF','AG','AL','AM','AO','AR','AT','AU','AZ','BA','BB','BD','BE','BF','BG','BH','BI','BJ',
  'BN','BO','BR','BS','BT','BW','BY','BZ','CA','CD','CF','CG','CH','CI','CL','CM','CN','CO','CR','CU',
  'CV','CY','CZ','DE','DJ','DK','DM','DO','DZ','EC','EE','EG','ER','ES','ET','FI','FJ','FM','FR','GA',
  'GB','GD','GE','GH','GM','GN','GQ','GR','GT','GW','GY','HN','HR','HT','HU','ID','IE','IL','IN','IQ',
  'IR','IS','IT','JM','JO','JP','KE','KG','KH','KI','KM','KN','KP','KR','KW','KZ','LA','LB','LC','LI',
  'LK','LR','LS','LT','LU','LV','LY','MA','MC','MD','ME','MG','MH','MK','ML','MM','MN','MR','MT','MU',
  'MV','MW','MX','MY','MZ','NA','NE','NG','NI','NL','NO','NP','NR','NZ','OM','PA','PE','PG','PH','PK',
  'PL','PT','PW','PY','QA','RO','RS','RU','RW','SA','SB','SC','SD','SE','SG','SI','SK','SL','SM','SN',
  'SO','SR','SS','ST','SV','SY','SZ','TD','TG','TH','TJ','TL','TM','TN','TO','TR','TT','TV','TW','TZ',
  'UA','UG','US','UY','UZ','VA','VC','VE','VN','VU','WS','YE','ZA','ZM','ZW',
];

const routes = [
  '/',
  '/countries',
  ...COUNTRIES.map(c => `/countries/${c}`),
  '/genres',
  ...GENRES.map(g => `/genres/${g}`),
  '/who-we-are',
  '/terms',
  '/privacy',
  '/faq',
  '/blog',
  ...BLOG_SLUGS.map(s => `/blog/${s}`),
];

// ── Tiny static file server ─────────────────────────────────────────
const MIME = {
  '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.woff': 'font/woff',
  '.ico': 'image/x-icon', '.webp': 'image/webp', '.txt': 'text/plain',
  '.xml': 'text/xml',
};

function serve() {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      let filePath = join(DIST, req.url === '/' ? 'index.html' : req.url);
      if (!existsSync(filePath) || !extname(filePath)) {
        filePath = join(DIST, 'index.html'); // SPA fallback
      }
      try {
        const data = readFileSync(filePath);
        const ext = extname(filePath);
        res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
        res.end(data);
      } catch {
        res.writeHead(404);
        res.end('Not found');
      }
    });
    server.listen(PORT, () => {
      console.log(`Static server on http://localhost:${PORT}`);
      resolve(server);
    });
  });
}

// ── Prerender ───────────────────────────────────────────────────────
async function prerender() {
  const server = await serve();

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
  });

  const CONCURRENCY = 8;
  let idx = 0;
  let done = 0;

  async function worker() {
    const page = await browser.newPage();
    // Block heavy assets to speed up rendering
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      const type = req.resourceType();
      if (['image', 'media', 'font', 'stylesheet'].includes(type)) {
        req.abort();
      } else {
        req.continue();
      }
    });

    while (idx < routes.length) {
      const route = routes[idx++];
      const url = `http://localhost:${PORT}${route}`;
      try {
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 15000 });
        // Wait a bit for React to hydrate and SEOHead to inject meta tags
        await page.evaluate(() => new Promise(r => setTimeout(r, 1500)));

        const html = await page.content();

        // Determine output path
        const outPath = route === '/'
          ? join(DIST, 'index.html')
          : join(DIST, route, 'index.html');

        const outDir = dirname(outPath);
        if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
        writeFileSync(outPath, html, 'utf-8');

        done++;
        if (done % 20 === 0 || done === routes.length) {
          console.log(`  Prerendered ${done}/${routes.length}`);
        }
      } catch (err) {
        console.warn(`  ⚠ Failed: ${route} – ${err.message}`);
        done++;
      }
    }
    await page.close();
  }

  console.log(`Prerendering ${routes.length} routes (concurrency=${CONCURRENCY})…`);
  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));

  await browser.close();
  server.close();
  console.log(`✅ Prerendering complete – ${done} pages written.`);
}

prerender().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
