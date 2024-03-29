import { GraphQLScalarType, Kind } from 'graphql';

const objectScalar = new GraphQLScalarType({
  name: 'Object',
  description: 'Object custom scalar type',
  serialize(value: any) {
    return typeof value === 'object' ? value : typeof value === 'string' ? JSON.parse(value) : null;
  },
  parseValue(value: number) {
    return typeof value === 'object' ? value : typeof value === 'string' ? JSON.parse(value) : null;
  },
  parseLiteral(ast) {
    switch (ast.kind) {
      case Kind.STRING:
        return JSON.parse(ast.value);
      case Kind.OBJECT:
        throw new Error(`Not sure what to do with OBJECT for ObjectScalarType`);
      default:
        return null;
    }
  },
});
export default objectScalar;
