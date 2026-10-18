// Usage: node screenshot.mjs <url> [label] [width] [height]
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const PUPPETEER_DIR = process.env.PUPPETEER_DIR || '/private/tmp/claude-501/-Users-erinparquet-Documents-Websites-Autumn-Lake/bad41927-5a5d-41c4-b63b-cecca4381047/scratchpad/';
const require = createRequire(PUPPETEER_DIR);
const puppeteer = require('puppeteer');

const [url = 'http://localhost:3000', label, w = '1440', h = '900'] = process.argv.slice(2);
const outDir = path.join(root, 'temporary screenshots');
fs.mkdirSync(outDir, { recursive: true });
const n = fs.readdirSync(outDir).filter(f => /^screenshot-\d+/.test(f)).map(f => +f.match(/^screenshot-(\d+)/)[1]).reduce((a, b) => Math.max(a, b), 0) + 1;
const out = path.join(outDir, `screenshot-${n}${label ? '-' + label : ''}.png`);

const browser = await puppeteer.launch({ headless: true, executablePath: process.env.CHROME_PATH || `${process.env.HOME}/.cache/puppeteer/chrome/mac_arm-150.0.7871.24/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing` });
const page = await browser.newPage();
page.on('pageerror', e => console.log('PAGE ERROR:', e.message));
page.on('console', m => m.type()==='error' && console.log('CONSOLE:', m.text()));
await page.setViewport({ width: +w, height: +h, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 1200));
await page.screenshot({ path: out, fullPage: process.env.FULL === '1' });
await browser.close();
console.log(out);
