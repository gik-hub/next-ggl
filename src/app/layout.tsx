'use client';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// TODO: DONE Define apollo client here and pass provider below and not from wrapper
const client = new ApolloClient({
  uri: 'http://localhost:3000/api/graphql',
  cache: new InMemoryCache(),
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <ApolloProvider client={client}>{children}</ApolloProvider>
      </body>
    </html>
  );
}
