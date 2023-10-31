import { Schema, SchemaTypeOptions } from 'mongoose';
import { IForm, IFormField, IWorkflow } from '../types';

const FormFields: Record<keyof IFormField, SchemaTypeOptions<any>> = {
  key: String,
  type: String,
  props: Object,
  children: Object,
};
const WorkFlowFields: Record<keyof IWorkflow, SchemaTypeOptions<any>> = {
  additionalRecipients: [String],
  approver: String,
  approverDelegate: [String],
  autoApproval: Boolean,
  includeAttachments: Boolean,
  approverLevel: String,
  approverMessage: String,
  disableNotification: Boolean,
  subject: String,
};
const FormSchemaFields: Record<keyof IForm, SchemaTypeOptions<any> | any> = {
  formId: String,
  formGroup: String,
  formName: String,
  isActive: Boolean,
  formDescription: String,
  activated: {
    type: Date,
    default: Date.now,
  },
  fields: FormFields,
  permissions: [String],
  workflows: [WorkFlowFields],
};

export interface IFormDoc extends IForm, Document {}
export const FormSchema = new Schema<IForm>(FormSchemaFields);
