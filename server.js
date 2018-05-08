const next = require('next');
const { microGraphiql, microGraphql } = require('apollo-server-micro');
const micro = require('micro');
const { get, post, router } = require('microrouter');
const schema = require('./schema');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

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
    console.log('> Ready on http://localhost:3000');
  });
});
