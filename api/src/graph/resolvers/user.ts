import { IUser } from '../../models/types';
import {
  Resolvers,
  Form,
  QueryResolvers,
  MutationResolvers,
  User,
  AuthPayload,
} from '../../__generated__/graphql';

const resolvers: Resolvers = {
  Query: {
    user: (_, { id }, { dataSources }): User => dataSources.user.getUser(id),
    users: (_, __, { dataSources }): User[] => dataSources.user.getUsers(),
  } as QueryResolvers,
  Mutation: {
    createUser: async (_, { input }, { dataSources }): Promise<User> => {
      return dataSources.user.createUser({
        ...input,
      });
    },
    updateUser: async (_, { input }, { dataSources }): Promise<User> =>
      dataSources.user.updateUser(input),
    loginUser: async (_, { input }, { dataSources }): Promise<AuthPayload> =>
      dataSources.user.loginUser(input),
  } as MutationResolvers,
};

export default resolvers;
