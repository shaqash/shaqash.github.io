import e from 'express';
import puppeteer from 'puppeteer';

const RENDER_CACHE = new Map();

const isDev = process.env.NODE_ENV !== 'prod';

/**
 * @param {Promise} promise
 * @param {'continue'|'fail'} severity Severity if failed 
 */
async function catchWithSeverity(promise, severity) {
  try {
    await promise;
  } catch (e) {
    console.error(e.message);
    if (severity === 'fail') throw e;
  }
}

/**
 * @param {string} url 
 */
export default async function ssr(url) {
  if (RENDER_CACHE.has(url)) {
    return { html: RENDER_CACHE.get(url), ttRenderMs: 0 };
  }

  const start = Date.now();

  const browser = await puppeteer.launch({ headless: !isDev });
  const page = await browser.newPage();

  await page.setRequestInterception(true);

  page.on('request', (req) => {
    // Ignore requests for resources that don't produce DOM
    const allowlist = ['document', 'script', 'xhr', 'fetch'];
    if (!allowlist.includes(req.resourceType())) {
      return req.abort();
    }
    req.continue();
  });

  await catchWithSeverity(page.goto(url, { waitUntil: 'networkidle0' }), 'fail');
  await catchWithSeverity(page.waitForSelector('.post', { timeout: 2000 }), 'continue');

  const html = await page.content();
  await browser.close();

  const ttRenderMs = Date.now() - start;
  console.info(`Headless rendered page in: ${ttRenderMs}ms`);

  RENDER_CACHE.set(url, html);

  return { html, ttRenderMs };
}
