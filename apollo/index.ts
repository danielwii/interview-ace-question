import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import fetch from 'node-fetch';

const client = new ApolloClient({
  ssrMode: true,
  link: createHttpLink({
    uri: '/graphql',
    fetch,
  }),
  cache: new InMemoryCache(),
});

const api = {
  articles: () =>
    client.query({
      query: gql`
        {
          articles {
            id
          }
        }
      `,
    }),
};

export { api, client };
