import express from 'express';
import ssrRouter from './middleware/ssrRouter.js';
import { BUILD_DIR, FALLBACK_PORT } from './config.js';
import { getPageList } from './lib/utils.js';
import path from 'path';

const __dirname = path.resolve();

const app = express();
const PORT = process.env.PORT || FALLBACK_PORT;

const pages = getPageList(`${BUILD_DIR}/dist/pages`);
console.log(pages);

app.use('/', ssrRouter(pages));
app.use('/', express.static(BUILD_DIR));
// app.get('/static/*', fallbackToIndex);

/** @type {import('express').RequestHandler} */
function fallbackToIndex(req, res) {
  console.log(path.join(__dirname, `${BUILD_DIR}/index.html`));
  res.sendFile(path.join(__dirname, `${BUILD_DIR}/index.html`));
}

app.listen(PORT, () => console.log('Server started. Press Ctrl+C to quit'));
