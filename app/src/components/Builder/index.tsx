export { default as Builder } from './Builder';

export const FieldTypes = [
  'main',
  'row',
  'column',
  'text',
  'check',
  'radio',
  'select',
  'lookup',
  'date',
  'time',
  'switch',
  'label'
] as const;

export type FormField = {
  key: string | number;
  type: typeof FieldTypes[number];
  children: FormField[] | undefined;
  props: Record<string, any>;
};
