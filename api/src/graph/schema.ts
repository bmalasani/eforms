import { makeExecutableSchema } from '@graphql-tools/schema';
import { GraphQLSchema } from 'graphql';
import { DIRECTIVES } from '@graphql-codegen/typescript-mongodb';
import { user, form, shared } from './typeDefs';
import { userResolver, formResolver, object } from './resolvers';

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs: [DIRECTIVES, shared, user, form],
  resolvers: [{ Object: object }, userResolver, formResolver],
});

export { schema };
