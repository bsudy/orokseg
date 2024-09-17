import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://localhost:8081/graphql', // Replace with your GraphQL endpoint
  cache: new InMemoryCache()
});

export default client;