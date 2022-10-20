import { FormField } from '../components/Builder';

const FieldProps = {
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

const formMain: FormField = {
  key: '0',
  type: 'main',
  props: {},
  children: [
    {
      key: '001',
      type: 'section',
      props: {
        title: 'Requestor Details',
        description: 'Please fill requestore details',
      },
      children: [
        {
          key: '0010',
          type: 'row',
          props: {},
          children: [
            {
              key: '00101',
              type: 'column',
              props: {
                sm: 12,
                md: 6,
              },
              children: [
                {
                  key: '001010',
                  type: 'text',
                  props: { label: 'Name', name: 'name' },
                  children: [],
                },
              ],
            },
            {
              key: '00102',
              type: 'column',
              props: {
                sm: 12,
                md: 6,
              },
              children: [
                {
                  key: '001020',
                  type: 'text',
                  props: { label: 'Department', name: 'department' },
                  children: [],
                },
              ],
            },
          ],
        },
        {
          key: '0020',
          type: 'row',
          props: {},
          children: [
            {
              key: '00101',
              type: 'column',
              props: {
                sm: 12,
                md: 6,
              },
              children: [
                {
                  key: '001010',
                  type: 'text',
                  props: { label: 'Position', name: 'position' },
                  children: [],
                },
              ],
            },
            {
              key: '00102',
              type: 'column',
              props: {
                sm: 12,
                md: 6,
              },
              children: [
                {
                  key: '001020',
                  type: 'text',
                  props: { label: 'Manager', name: 'manager' },
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      key: '002',
      type: 'section',
      props: {
        title: 'Key Details',
        description: 'Please fill key details',
      },
      children: [
        {
          key: '0010',
          type: 'row',
          props: {},
          children: [
            {
              key: '00101',
              type: 'column',
              props: {
                sm: 12,
                md: 6,
              },
              children: [
                {
                  key: '001010',
                  type: 'text',
                  props: { label: 'Key Number', name: 'keynumber' },
                  children: [],
                },
              ],
            },
            {
              key: '00102',
              type: 'column',
              props: {
                sm: 12,
                md: 6,
              },
              children: [
                {
                  key: '001020',
                  type: 'text',
                  props: { label: 'Room', name: 'room' },
                  children: [],
                },
              ],
            },
          ],
        },
        {
          key: '0020',
          type: 'row',
          props: {},
          children: [
            {
              key: '00101',
              type: 'column',
              props: {
                sm: 12,
                md: 6,
              },
              children: [
                {
                  key: '001010',
                  type: 'text',
                  props: { label: 'Building', name: 'building' },
                  children: [],
                },
              ],
            },
            {
              key: '00102',
              type: 'column',
              props: {
                sm: 12,
                md: 6,
              },
              children: [
                {
                  key: '001020',
                  type: 'text',
                  props: { label: 'Area', name: 'area' },
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const KeyRequisationForm = {
  core: {
    formId: 'HI00001',
    formName: 'Key Requisation',
    formGroup: 'General',
    allowedDepartments: ['test'],
    isActive: true,
  },
  formWorkFlow: [
    {
      approverLevel: 'FunctionalApprover',
      approver: '9_0p-NUM',
      approverDelegate: ['F-syENd2'],
      approverComments: 'hK-EhhG4',
      autoApproval: true,
      includeAttachments: true,
      disableNotification: false,
    },
  ],
  formWorkNotification: { subject: '3VGyK71I', additionalReceipients: ' QF9RXAn' },
  formDetails: {
    ...formMain
  },
  activeTill: 'Smith',
  submitterMessage: 'Smith',
  approverMessage: 'Smith',
  compeletedMessage: 'Smith',   
};
