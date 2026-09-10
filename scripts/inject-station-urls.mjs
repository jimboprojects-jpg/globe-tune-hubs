/**
 * Deprecated shim: station URLs are now emitted by scripts/generate-sitemap.mjs,
 * which writes the sitemap index plus the pages/stations sitemaps.
 */
import { spawnSync } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const res = spawnSync(process.execPath, [join(__dirname, 'generate-sitemap.mjs')], { stdio: 'inherit' });
process.exit(res.status ?? 0);
