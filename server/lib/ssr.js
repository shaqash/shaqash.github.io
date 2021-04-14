import puppeteer from 'puppeteer';

const RENDER_CACHE = new Map();

/**
 * @param {string} url 
 */
export default async function ssr(url) {
  if (RENDER_CACHE.has(url)) {
    return { html: RENDER_CACHE.get(url), ttRenderMs: 0 };
  }

  const start = Date.now();

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
    ],
  });
  const page = await browser.newPage();

  await page.setRequestInterception(true);

  page.on('request', (req) => {
    const allowlist = ['document', 'script', 'xhr', 'fetch'];
    if (!allowlist.includes(req.resourceType())) {
      return req.abort();
    }
    req.continue();
  });

  await page.goto(url, { waitUntil: 'networkidle0' });

  const html = await page.content();
  await browser.close();

  const ttRenderMs = Date.now() - start;
  console.info(`Headless rendered page in: ${ttRenderMs}ms`);

  RENDER_CACHE.set(url, html);

  return { html, ttRenderMs };
}
