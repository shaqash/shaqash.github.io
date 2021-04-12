import express from 'express';
import ssrRouter from './routers/ssrRouter.js';
import { BUILD_DIR, FALLBACK_PORT } from './config.js';

const app = express();
const PORT = process.env.PORT || FALLBACK_PORT;

app.use('/', ssrRouter);
app.use(express.static(BUILD_DIR));

app.listen(PORT, () => console.log('Server started. Press Ctrl+C to quit'));
