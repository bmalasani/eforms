import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { json } from 'body-parser';
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { apiConfig } from './config';
import { FormsDataSource, UsersDataSource } from './graph/datasources';
import { schema } from './graph/schema';
import routes from './routes';

interface AppContext {
  dataSources: {
    user: FormsDataSource;
    form: UsersDataSource;
  };
}

const initApi = async () => {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    schema: schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  app.use('/v1', json(), routes);
  app.use(
    '/gql',
    json(),
    expressMiddleware(server, {
      context: async () => {
        return {
          dataSources: {
            form: new FormsDataSource(),
            user: new UsersDataSource(),
          },
        };
      },
    })
  );

  await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀  Server ready at: http://localhost:4000/gql`);
};

async function main() {
  try {
    await mongoose.connect(apiConfig.mongoConnection);
    mongoose.connection.useDb(apiConfig.database);
    await initApi();
  } catch (e) {
    console.log(e);
  }
}

main();
