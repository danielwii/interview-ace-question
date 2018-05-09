const next = require('next');
const { microGraphiql, microGraphql } = require('apollo-server-micro');
const micro = require('micro');
const { get, post, router } = require('microrouter');
const schema = require('./server/schema');
const logger = require('consola').withScope('server');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// connecting to db
const init = require('./server/connection');

(async () => {
  logger.info('connecting to db...');
  await init();

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

// https://stackoverflow.com/questions/40900791/cannot-redeclare-block-scoped-variable-in-unrelated-files
// export {};
