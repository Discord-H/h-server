import 'reflect-metadata';
import 'dotenv/config';

import '@shared/containers';
import '@shared/infra/typeorm/connection';

import { app } from './app';

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
