import path from 'path';

const mongoUserData = {
  user: process.env.MONGO_USER,
  password: process.env.MONGO_PASSWORD,
  db: process.env.MONGO_DB,
};
const mongoUrl = `mongodb://${mongoUserData.user}:${mongoUserData.password}@main-shard-00-00.gzjad.mongodb.net:27017,main-shard-00-01.gzjad.mongodb.net:27017,main-shard-00-02.gzjad.mongodb.net:27017/${mongoUserData.db}?ssl=true&replicaSet=atlas-n44906-shard-0&authSource=admin&retryWrites=true&w=majority
  `;

const entityPath =
  path.extname(__filename) === '.ts'
    ? './src/modules/**/infra/typeorm/entities/*.ts'
    : './dist/modules/**/infra/typeorm/entities/*.js';

export const mongoConfig = {
  url: mongoUrl,
  useNewUrlParser: true,
  synchronize: true,
  useUnifiedTopology: true,
  logging: true,
  ssl: true,
  entities: [entityPath],
  authSource: 'admin',
};
