import express from 'express';
import ssr from '../lib/ssr.js';

function getHandlerForPage(page) {
  return async function ssrHandler(req, res) {
    const url = `${req.protocol}://${req.get('host')}/${page}.html`;
    const { html, ttRenderMs } = await ssr(url);

    res.set(
      'Server-Timing',
      `Prerender;dur=${ttRenderMs};desc="Headless render time (ms)"`
    );

    return res.status(200).send(html);
  };
}

/**
 * @param {string[]} pages List of html files that are served
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

export default initRoutingForPages;
