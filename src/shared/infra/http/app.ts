import cors from 'cors';
import express from 'express';

import { router } from './router';

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: '*',
  })
);

app.get('/hello', (_, res) => {
  res.send('There');
});

app.use(router);

export { app };
