// WCAG check of the built site (axe-core). Fails on any violation.
// Checks every .html file in SITE_DIR (the built _site), served at BASE_URL.
// CHROMIUM_PATH optionally overrides the browser.
import { readdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';

const base = process.env.BASE_URL || 'http://localhost:8000';
const siteDir = process.env.SITE_DIR || '../_site';
const pages = readdirSync(siteDir, { recursive: true })
  .filter((f) => f.endsWith('.html'))
  .map((f) => '/' + relative(siteDir, join(siteDir, f)).split('\\').join('/'))
  .sort();
if (!pages.length) throw new Error(`No .html files found in ${siteDir}`);
const tags = ['wcag2a', 'wcag2aa', 'wcag2aaa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}
);
let failures = 0;

for (const colorScheme of ['light', 'dark']) {
  for (const path of pages) {
    const context = await browser.newContext({ colorScheme });
    const page = await context.newPage();
    await page.goto(base + path, { waitUntil: 'networkidle' });
    const { violations } = await new AxeBuilder({ page }).withTags(tags).analyze();
    console.log(`${colorScheme} ${path}: ${violations.length} violation(s)`);
    for (const v of violations) {
      console.log(`  [${v.impact}] ${v.id}: ${v.help}`);
      for (const n of v.nodes) console.log(`    ${n.target.join(' ')}`);
    }
    failures += violations.length;
    await context.close();
  }
}

await browser.close();
process.exit(failures ? 1 : 0);
