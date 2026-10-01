// WCAG check of the built site (axe-core). Fails on any violation.
// BASE_URL points at the served _site; CHROMIUM_PATH optionally overrides the browser.
import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';

const base = process.env.BASE_URL || 'http://localhost:8000';
const pages = ['/', '/resume.html', '/work.html'];
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
