import next from 'next';
import micro from 'micro';
import { microGraphiql, microGraphql } from 'apollo-server-micro';
import { get, post, router } from 'microrouter';

import createConnection from './server/connection';
import schema from './server/schema';
import { loadSeeds } from './server/seeds';

const logger = require('consola').withScope('server');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
(async () => {
  logger.info('connecting to db...');
  try {
    await createConnection();
    await loadSeeds();
  } catch (e) {
    logger.error(e);
    process.exit(1);
  }

  logger.info('create server...');
  const graphqlHandler = microGraphql({ schema });
  const graphiqlHandler = microGraphiql({ endpointURL: '/graphql' });

  app.prepare().then(() => {
    micro(
      router(
        get('/graphql', graphqlHandler),
        post('/graphql', graphqlHandler),
        get('/graphiql', graphiqlHandler),
        (req, res) => handle(req, res),
      ),
    ).listen(3000, err => {
      if (err) throw err;
      logger.info('Ready on http://localhost:3000');
    });
  });
})();
