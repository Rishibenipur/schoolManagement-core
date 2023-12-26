import 'reflect-metadata';
import dotenv from 'dotenv';
import cors from 'cors';
import * as tq from 'type-graphql';

import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { allResolver } from './resolvers/resolver';

import { AuthChecker } from 'type-graphql';

/**
 * This is a simple function that manages access to protected resolvers
 * by user
 */
export const schoolAuthChecker: AuthChecker<any, number> = async (
  { context: { user } },
  capabilities,
) => {
  return true;
};

dotenv.config();

// start server

async function startServer() {
  const schema = await tq.buildSchema({
    authChecker: schoolAuthChecker,
    resolvers: allResolver(),
  });

  const server = new ApolloServer({
    schema,
  });

  const app = express();
  app.use(cors());

  server.applyMiddleware({ app });

  app.listen({ port: process.env.PORT }, () => {
    console.log(`server ready at http://localhost:${process.env.PORT}`);
    console.log(`server ready at http://localhost:${process.env.PORT}/graphql`);
  });
}

startServer();
