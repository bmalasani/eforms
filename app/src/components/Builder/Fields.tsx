import FormLabel from '@mui/material/FormLabel';
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
import FieldArray from './FieldArray';

export const FieldTypes = [
  'main',
  'row',
  'column',
  'section',
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
  'title',
  'description',
  'label',
  'name',
  'defaultValue',
  'value',
  'items',
  'lookup',
  'rules',
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

const FieldProps: Record<string, FormField> = {
  sm: {
    key: 'sm00',
    type: 'select',
    props: {
      label: 'width in mobile devices',
      name: 'sm',
      items: [...Array(12).keys()].map((i) => ({ label: `${i + 1}`, value: `${i + 1}` })),
    },
  },
  md: {
    key: 'md01',
    type: 'select',
    props: {
      label: 'width in desktop devices',
      name: 'md',
      items: [...Array(12).keys()].map((i) => ({ label: `${i + 1}`, value: `${i + 1}` })),
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
};

export const Fields: Record<typeof FieldTypes[number], FieldValue> = {
  main: {
    childrenTypes: ['section', 'row'],
    canAddMultiple: false,
    fields: [FieldProps.props],
    component: ({ children, ...props }: any) => (
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }} {...props}>
        {children}
      </Box>
    ),
  },
  section: {
    childrenTypes: ['row'],
    canAddMultiple: false,
    fields: [FieldProps.title, FieldProps.description, FieldProps.props],
    component: ({ children, ...props }: any) => <Section {...props}>{children}</Section>,
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
    childrenTypes: FieldTypes.filter((x, i) => i > 3),
    canAddMultiple: true,
    fields: [FieldProps.sm, FieldProps.md, FieldProps.props],
    component: ({ children, ...props }: any) => (
      <Grid item {...props}>
        {children}
      </Grid>
    ),
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
    fields: [FieldProps.label, FieldProps.name, FieldProps.props],
    component: ({ children, ...props }: any) => <FieldArray {...props} />,
  },
};
