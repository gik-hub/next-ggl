import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from '@apollo/server';
import { gql } from 'graphql-tag';
import { NextRequest } from "next/server";

let book = {
    name: "The Large Hungarian Sausage",
    author: "Ben Grunfeld",
};

const typeDefs = gql`
  type Book {
    name: String
    author: String
  }

  type Query {
    book: Book
  }

  type Mutation {
    updateBook(name: String!, author: String!): Book
  }
`;

const resolvers = {
    Query: {
        book: () => book,
    },
    Mutation: {
        updateBook: (root: any, args: { name: string; author: string }) => {
            book.name = args.name;
            book.author = args.author;
            return book;
        },
    },
};

const server = new ApolloServer({
    resolvers,
    typeDefs,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
    // context: async (req, res) => ({ req, res, user: await getLoggedInUser(req) }),
    /**
 * Represents a function that asynchronously processes a request and returns an object containing the request.
 * @param req - The NextRequest object representing the incoming request.
 * @returns An object containing the request.
 */
    context: async (req: NextRequest) => ({ req }),
});

export { handler as GET, handler as POST };
export default handler;