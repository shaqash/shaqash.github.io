import express from 'express';
import ssr from '../ssr.js';
import { PAGES, CSR_FALLBACK_URL } from '../config.js';

function getHandlerForPage(page) {
  return async function ssrHandler(req, res) {
    const url = `${req.protocol}://${req.get('host')}/${page}.html`;
    const { html, ttRenderMs } = await ssr(url);

    res.set(
      'Server-Timing',
      `Prerender;dur=${ttRenderMs};desc="Headless render time (ms)"`
    );
    return res.status(200).send(html); // Serve prerendered page as response.
  };
}

/**
 * @param {string[]} pages 
 * @returns {express.Router}
 */
function initRoutingForPages(pages) {
  const router = express.Router();

  router.get('/', getHandlerForPage('index'));

  pages.forEach((page) => {
    router.get(`/${page}`, getHandlerForPage(page));
  });

  return router;
}

const router = initRoutingForPages(PAGES);

export default router;
