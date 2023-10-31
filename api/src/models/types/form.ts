export enum ApproverLevel {
  Requestor = 'Requestor',
  Reviewer = 'Reviewer',
  DepartmentApprover = 'DepartmentApprover',
  FunctionalApprover = 'FunctionalApprover',
  ActionTaker = 'ActionTaker',
}

export const FieldTypes = [
  'main',
  'builder',
  'row',
  'column',
  'section',
  'stack',
  'box',
  'text',
  'check',
  'radio',
  'select',
  'lookup',
  'date',
  'time',
  'switch',
  'label',
  'array',
] as const;

export const PropTypes = [
  'defaultValue',
  'description',
  'fields',
  'items',
  'label',
  'lookup',
  'name',
  'rules',
  'title',
  'value',
  'array',
] as const;

type PropsRecord = {
  [P in typeof PropTypes[number]]?: any;
} & Record<string, any>;

export interface IFormField {
  key: string | number;
  type: typeof FieldTypes[number];
  children?: IFormField[] | undefined;
  props?: PropsRecord;
}

export interface IWorkflow {
  approverLevel?: ApproverLevel;
  approver?: string;
  approverDelegate?: string[];
  autoApproval?: boolean;
  includeAttachments?: boolean;
  disableNotification?: boolean;
  approverMessage: string;
  subject?: string;
  additionalRecipients?: string[];
}

export interface IForm {
  formId: string;
  formName: string;
  formGroup: string;
  formDescription: string;
  isActive: boolean;
  permissions: string[];
  activated: Date;
  workflows: IWorkflow[];
  fields: IFormField;
}
