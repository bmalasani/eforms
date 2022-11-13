import FormLabel from '@mui/material/FormLabel';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import { get } from '../../utils';
import { Autocomplete } from '../Autocomplete';
import { Box } from '../Box';
import { CheckBox } from '../CheckBox';
import { DatePicker } from '../DatePicker';
import { Radio } from '../Radio';
import { Section } from '../Section';
import { Select } from '../Select';
import { Switch } from '../Switch';
import { TextField } from '../TextField';
import { TimePicker } from '../TimePicker';
import Builder from './Builder';
import FieldArray from './FieldArray';

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

export type FormField = {
  key: string | number;
  type: typeof FieldTypes[number];
  children?: FormField[] | undefined;
  props: PropsRecord;
};

export type FieldValue = {
  childrenTypes: typeof FieldTypes[number][];
  canAddMultiple?: boolean;
  component?: ({ children, ...props }: Record<string, any>) => any;
  fields?: FormField[];
};

const FieldProps: Record<typeof PropTypes[number] | string, FormField> = {
  sm: {
    key: 'sm00',
    type: 'select',
    props: {
      label: 'width in mobile devices',
      name: 'sm',
      items: [...Array(12).keys()].map((i) => ({ label: `${i + 1}`, value: i + 1 })),
    },
  },
  md: {
    key: 'md01',
    type: 'select',
    props: {
      label: 'width in desktop devices',
      name: 'md',
      items: [...Array(12).keys()].map((i) => ({ label: `${i + 1}`, value: i + 1 })),
    },
  },
  label: {
    key: 'label00',
    type: 'text',
    props: {
      label: 'label',
      name: 'label',
      rules: { required: true },
    },
  },
  title: {
    key: 'title00',
    type: 'text',
    props: {
      label: 'Title',
      name: 'title',
      rules: { required: true },
    },
  },
  description: {
    key: 'description00',
    type: 'text',
    props: {
      label: 'Description',
      name: 'description',
    },
  },
  name: {
    key: 'name01',
    type: 'text',
    props: {
      label: 'name',
      name: 'name',
      rules: { required: true },
    },
  },
  lookup: {
    key: 'lookup01',
    type: 'select',
    props: {
      label: 'Lookup',
      name: 'lookup',
      items: ['User', 'Department', 'Manager', 'Position', 'Currnecy', 'Country'].map((i) => ({
        label: i,
        value: i,
      })),
    },
  },
  items: {
    key: 'items01',
    type: 'array',
    props: {
      label: 'Add Items',
      name: 'items',
      fields: [
        {
          key: 'name01',
          type: 'text',
          props: {
            label: 'label',
            name: 'label',
            rules: { required: true },
          },
        },
        {
          key: 'value01',
          type: 'text',
          props: {
            label: 'value',
            name: 'value',
            rules: { required: true },
          },
        },
      ],
    },
  },
  props: {
    key: 'props01',
    type: 'array',
    props: {
      label: 'Add Props',
      name: 'props',
      fields: [
        {
          key: 'name01',
          type: 'text',
          props: {
            label: 'label',
            name: 'label',
          },
        },
        {
          key: 'value01',
          type: 'text',
          props: {
            label: 'value',
            name: 'value',
          },
        },
      ],
    },
  },
  rules: {
    key: 'rules01',
    type: 'array',
    props: {
      label: 'Add Rule',
      name: 'rules',
      fields: [
        {
          key: 'name01',
          type: 'text',
          props: {
            label: 'label',
            name: 'label',
            rules: { required: true },
          },
        },
        {
          key: 'value01',
          type: 'text',
          props: {
            label: 'value',
            name: 'value',
            rules: { required: true },
          },
        },
      ],
    },
  },
  array: {
    key: 'fieldLookup',
    type: 'array',
    props: {
      label: 'Fields',
      name: 'fields',
      boxSX: {
        flexDirection: 'column',
      },
      fields: [
        {
          key: 'key009',
          type: 'text',
          props: {
            label: 'Key',
            name: 'key',
            rules: { required: true },
          },
        },
        {
          key: 'type008',
          type: 'select',
          props: {
            label: 'Type',
            name: 'type',
            items: FieldTypes.filter((_f, ind) => ind > 1).map((field) => ({
              label: field,
              value: field,
            })),
            rules: { required: true },
          },
        },
        {
          key: 'label009',
          type: 'text',
          props: {
            label: 'Label',
            name: 'label',
            rules: { required: true },
          },
        },
        {
          key: 'name0000',
          type: 'text',
          props: {
            label: 'Name',
            name: 'name',
            rules: { required: true },
          },
        },
        {
          key: 'props01',
          type: 'array',
          props: {
            label: 'Field Props',
            name: 'props',
            fields: [
              {
                key: 'name01',
                type: 'text',
                props: {
                  label: 'label',
                  name: 'label',
                },
              },
              {
                key: 'value01',
                type: 'text',
                props: {
                  label: 'value',
                  name: 'value',
                },
              },
            ],
          },
        },
      ],
    },
  },
};

export const Fields: Record<typeof FieldTypes[number], FieldValue> = {
  main: {
    childrenTypes: ['section', 'row', 'stack', 'box'],
    canAddMultiple: false,
    fields: [FieldProps.props],
    component: ({ children, ...props }: any) => (
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }} {...props}>
        {children}
      </Box>
    ),
  },
  builder: {
    childrenTypes: ['section', 'row', 'stack', 'box'],
    canAddMultiple: false,
    fields: [FieldProps.props],
    component: ({ children, ...props }: any) => <Builder {...props}></Builder>,
  },
  section: {
    childrenTypes: ['row', 'stack', 'box'],
    canAddMultiple: false,
    fields: [FieldProps.title, FieldProps.description, FieldProps.props],
    component: ({ children, ...props }: any) => <Section {...props}>{children}</Section>,
  },
  stack: {
    childrenTypes: FieldTypes.filter((x, i) => i > 1),
    canAddMultiple: true,
    fields: [FieldProps.props],
    component: ({ children, ...props }: any) => (
      <Stack gap={3} {...props}>
        {children}
      </Stack>
    ),
  },
  box: {
    childrenTypes: FieldTypes.filter((x, i) => i > 1),
    canAddMultiple: true,
    fields: [FieldProps.props],
    component: ({ children, ...props }: any) => <Box {...props}>{children}</Box>,
  },
  row: {
    childrenTypes: ['column'],
    canAddMultiple: true,
    fields: [FieldProps.props],
    component: ({ children, ...props }: any) => (
      <Grid container spacing={3} {...props}>
        {children}
      </Grid>
    ),
  },
  column: {
    childrenTypes: FieldTypes.filter((x, i) => i > 1),
    canAddMultiple: true,
    fields: [FieldProps.sm, FieldProps.md, FieldProps.props],
    component: ({ children, ...props }: any) => <Grid {...props}>{children}</Grid>,
  },
  check: {
    childrenTypes: [],
    canAddMultiple: false,
    fields: [FieldProps.label, FieldProps.name, FieldProps.props],
    component: ({ children, ...props }: any) => <CheckBox {...props} />,
  },
  date: {
    childrenTypes: [],
    canAddMultiple: false,
    fields: [FieldProps.label, FieldProps.name, FieldProps.props],
    component: ({ children, ...props }: any) => <DatePicker {...props} />,
  },
  label: {
    childrenTypes: [],
    canAddMultiple: false,
    fields: [FieldProps.label, FieldProps.props],
    component: ({ children, ...props }: any) => (
      <FormLabel {...props}>{get(props, 'label', '__')}</FormLabel>
    ),
  },
  lookup: {
    childrenTypes: [],
    canAddMultiple: false,
    fields: [
      FieldProps.label,
      FieldProps.name,
      FieldProps.items,
      FieldProps.lookup,
      FieldProps.props,
    ],
    component: ({ children, ...props }: any) => <Autocomplete {...props} />,
  },
  radio: {
    childrenTypes: [],
    canAddMultiple: false,
    fields: [FieldProps.label, FieldProps.name, FieldProps.items, FieldProps.props],
    component: ({ children, ...props }: any) => <Radio {...props} />,
  },
  select: {
    childrenTypes: [],
    canAddMultiple: false,
    fields: [FieldProps.label, FieldProps.name, FieldProps.items, FieldProps.props],
    component: ({ children, ...props }: any) => <Select {...props} />,
  },
  switch: {
    childrenTypes: [],
    canAddMultiple: false,
    fields: [FieldProps.label, FieldProps.name, FieldProps.props],
    component: ({ children, ...props }: any) => <Switch {...props} />,
  },
  text: {
    childrenTypes: [],
    canAddMultiple: false,
    fields: [FieldProps.label, FieldProps.name, FieldProps.props],
    component: ({ children, ...props }: any) => <TextField {...props} />,
  },
  time: {
    childrenTypes: [],
    canAddMultiple: false,
    fields: [FieldProps.label, FieldProps.name, FieldProps.props],
    component: ({ children, ...props }: any) => <TimePicker {...props} />,
  },
  array: {
    childrenTypes: [],
    canAddMultiple: false,
    fields: [FieldProps.array, FieldProps.props],
    component: ({ children, ...props }: any) => <FieldArray {...props} />,
  },
};
