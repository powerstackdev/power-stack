import fetch from 'cross-fetch';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

export const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://drupal9-test.docksal/graphql',
    fetch,
    headers: {
      "api-key": "1d30a1ea6ebb5918f5f454cab859055b"
    }
  }),
  cache: new InMemoryCache()
});
