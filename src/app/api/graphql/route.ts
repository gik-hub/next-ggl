import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from '@apollo/server';
import { NextRequest } from "next/server";
import resolvers from './resolvers'
import typeDefs from './schema'

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
    // context: async (req: NextRequest) => ({ req }),
});

// export { handler as GET, handler as POST };
// export default handler;

export async function GET(request: NextRequest) {
    return handler(request);
}

export async function POST(request: NextRequest) {
    return handler(request);
}