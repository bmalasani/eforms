export default `#graphql
"""
Form Type
"""
scalar Object

type FormField @entity {
  key: ID!
  type: ID!
  children: [FormField]
  props: Object
}

enum ApproverLevel {
  Requestor 
  Reviewer
  DepartmentApprover     
  FunctionalApprover 
  ActionTaker 
}

type Workflow @entity {
  approverLevel: ApproverLevel
  approver: String
  approverDelegate: [String]
  autoApproval: Boolean
  includeAttachments: Boolean
  disableNotification: Boolean
  approverMessage: String
  subject: String
  additionalRecipients: [String]
}

type Form @entity {
  formId: ID!
  formName: String! @column
  formGroup: String! @column
  isActive: Boolean
  permissions: [String]
  workflows: [Workflow] @embedded
  fields: FormField @embedded
}

input FormInput  {
  formId: ID!
  formName: String!
  formGroup: String!
  isActive: Boolean
  permissions: [String]
}

extend type Query {
  form(id: ID!): Form
  forms: [Form!]!
}

extend type Mutation {
  createForm(input: FormInput!): Form!
  updateForm(input: FormInput!): Form!
}

`;
