import { IForm } from '../../models/types';
import { Resolvers, Form, QueryResolvers, MutationResolvers } from '../../__generated__/graphql';

const resolvers: Resolvers = {
  Query: {
    form: (_, { id }, { dataSources }): Form => dataSources.form.getForm(id),
    forms: (_, __, { dataSources }): IForm[] => dataSources.form.getForms(),
  } as QueryResolvers,
  Mutation: {
    createForm: async (_, { input }, { dataSources }): Promise<Form> => {
      return dataSources.form.createForm({
        ...input,
      });
    },
    updateForm: async (_, { input }, { dataSources }): Promise<Form> =>
      dataSources.form.updateForm(input),
  } as MutationResolvers,
};

export default resolvers;
