export default `#graphql
"""
User Type
"""
type User @entity {
  uuid: ID!
  firstName: String
  lastName: String
  email: String
  alias: String
  password: String
  managerAlias: String
  department: String
  lastLogon: String
  permissions: [String]
}

input UserInput {
  firstName: String
  lastName: String
  email: String
  alias: String
  password: String
  managerAlias: String
  department: String
  lastLogon: String
  permissions: [String]
}

type AuthPayload {
    token: String!
}

extend type Query {
  user(id: ID!): User
  users: [User!]!
}

extend type Mutation {
  createUser(input: UserInput!): User!
  updateUser(input: UserInput!): User!
  loginUser(input: LoginUserInput!): AuthPayload!
}
input LoginUserInput {
    email: String!
    password: String!
}
`;
