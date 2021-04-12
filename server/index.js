import express from 'express';
import ssrRouter from './middleware/ssrRouter.js';
import { BUILD_DIR, FALLBACK_PORT } from './config.js';
import { getPageList } from './lib/utils.js';

const app = express();
const PORT = process.env.PORT || FALLBACK_PORT;

const pages = getPageList(BUILD_DIR);

app.use('/', ssrRouter(pages));
app.use(express.static(BUILD_DIR));

app.listen(PORT, () => console.log('Server started. Press Ctrl+C to quit'));
