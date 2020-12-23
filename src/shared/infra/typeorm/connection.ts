import { createConnection } from 'typeorm';

import { mongoConfig } from '@config/mongo';

createConnection({
  type: 'mongodb',
  ...mongoConfig,
}).catch(console.error);
