import express from 'express';
import ssr from '../lib/ssr.js';

/** @param {string} page Page name */
function getHandlerForPage(page) {
  /** @type {import('express').RequestHandler} */
  async function ssrHandler(req, res, next) {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const queryString = `${new URL(`${baseUrl}${req.originalUrl}`).search}`;
    const url = `${baseUrl}/${page}.html${queryString}`;

    try {
      const { html, ttRenderMs } = await ssr(url);

      res.set(
        'Server-Timing',
        `Prerender;dur=${ttRenderMs};desc="Headless render time (ms)"`
      );

      res.status(200).send(html);
    } catch (e) {
      console.error(e.message);
      next();
    }
  };

  return ssrHandler;
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
