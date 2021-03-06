import { createConnection } from 'typeorm';
import { memoize } from 'lodash';

import { ConfigKeys, configLoader } from './helpers/config';

const logger = require('consola').withScope('connection');

export default memoize(() => {
  const type = configLoader.loadConfig(ConfigKeys.DB_ENGINE, 'postgres');
  const host = configLoader.loadConfig(ConfigKeys.DB_HOST, 'localhost');
  const port = configLoader.loadConfig(ConfigKeys.DB_PORT, 5432);
  logger.info(`try to connect to ${type}://${host}:${port}`);

  return createConnection({
    type,
    host,
    port,
    username: configLoader.loadConfig(ConfigKeys.DB_USERNAME, 'postgres'),
    password: configLoader.loadConfig(ConfigKeys.DB_PASSWORD, 'postgres'),
    database: configLoader.loadConfig(ConfigKeys.DB_DATABASE, 'postgres'),
    entities: [__dirname + '/entities/*.js'],
    autoSchemaSync: true,
    synchronize: true,
    logging: configLoader.loadConfig(ConfigKeys.DB_LOGGING, 'all'),
    logger: 'advanced-console',
  });
});
