import Stack from '@mui/material/Stack';
import { FormProvider, useForm } from 'react-hook-form';
import { Card } from '../components/Cards';
import Container from '@mui/material/Container';
import { FormField, Renderer } from '../components/Builder';
import { Box, StyledStepper, Typography } from '../components';
import { useMemo, useState } from 'react';

function FormBuilder() {
  const form = useForm();
  const { handleSubmit } = form;
  const [activeStep, setActiveStep] = useState(0);

  const formInitialFields = useMemo<FormField>(
    () => ({
      key: 'stackooo',
      type: 'stack',
      props: {
        mx: { sm: 0, md: 18 },
      },
      children: [
        {
          key: 'sction0009',
          type: 'section',
          props: {
            title: 'Core',
            description: 'enter form details',
          },
          children: [
            {
              key: 'formId',
              type: 'text',
              props: {
                label: 'Form ID',
                name: 'formId',
                rules: { required: true },
              },
            },
            {
              key: 'formName',
              type: 'text',
              props: {
                label: 'Form Name',
                name: 'formName',
                rules: { required: true },
              },
            },
            {
              key: 'formGroup',
              type: 'lookup',
              props: {
                label: 'Form Group',
                name: 'formGroup',
                items: [{ label: 'test', value: 'test' }],
                rules: { required: true },
                creatable: true,
              },
            },
            {
              key: 'formDescr',
              type: 'text',
              props: {
                label: 'Form Description',
                name: 'formDescription',
                multiline: true,
                rules: { required: true },
              },
            },
            {
              key: 'activated',
              type: 'date',
              props: {
                label: 'Activate Form On',
                name: 'activated',
                multiline: true,
                rules: { required: true },
              },
            },
          ],
        },
      ],
    }),
    []
  );

  const formBuilderFields = useMemo(
    () => ({
      key: 'builder00',
      type: 'builder',
      props: {},
      children: [],
    }),
    []
  );

  const formCompletionFields = useMemo<FormField>(
    () => ({
      key: 'stack',
      type: 'stack',
      props: {
        mx: { sm: 0, md: 18 },
      },
      children: [
        {
          key: 'sction0009',
          type: 'section',
          props: {
            title: 'Workflow',
            description: 'create new workflow',
          },
          children: [
            {
              key: 'props01',
              type: 'array',
              props: {
                label: 'Add Flow',
                name: 'workflows',
                fields: [
                  {
                    key: 'approverLevel',
                    type: 'lookup',
                    props: {
                      label: 'Approver Level',
                      name: 'approverLevel',
                      items: [
                        { label: 'Requestor', value: 'Requestor' },
                        { label: 'Reviewer', value: 'Reviewer' },
                        { label: 'Department Approver', value: 'DepartmentApprover' },
                        { label: 'Functional Approver', value: 'FunctionalApprover' },
                        { label: 'Action Taker', value: 'ActionTaker' },
                      ],
                      rules: { required: true },
                    },
                  },
                  {
                    key: 'approver001',
                    type: 'text',
                    props: {
                      label: 'Approver',
                      name: 'approver',
                    },
                  },
                  {
                    key: 'approverDelegate',
                    type: 'text',
                    props: {
                      label: 'Approver Delegates',
                      name: 'approverDelegate',
                      multiline: true,
                    },
                  },
                  {
                    key: 'autoApproval',
                    type: 'switch',
                    props: {
                      label: 'Auto Approval',
                      name: 'autoApproval',
                    },
                  },
                  {
                    key: 'includeAttachments',
                    type: 'switch',
                    props: {
                      label: 'Include Attachments',
                      name: 'includeAttachments',
                    },
                  },
                  {
                    key: 'disableNotification',
                    type: 'switch',
                    props: {
                      label: 'Disable Notification',
                      name: 'disableNotification',
                      defaultValue: true,
                    },
                  },
                  {
                    key: 'approverMessage',
                    type: 'text',
                    props: {
                      label: 'Approver Message',
                      name: 'approverMessage',
                    },
                  },
                  {
                    key: 'subject',
                    type: 'text',
                    props: {
                      label: 'Subject',
                      name: 'subject',
                    },
                  },
                  {
                    key: 'additionalRecipients',
                    type: 'text',
                    props: {
                      label: 'Additional Recipients',
                      name: 'additionalRecipients',
                    },
                  },
                ],
                boxSX: {
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gridTemplateRows: 'repeat(2, 1fr)',
                  gridColumnGap: '32px',
                  gridRowGap: '32px',
                },
              },
            },
          ],
        },
      ],
    }),
    []
  );

  const steps: { label: string; fields?: any }[] = [
    {
      label: 'New Form',
      fields: formInitialFields,
    },
    {
      label: 'Form Details',
      fields: formBuilderFields,
    },
    {
      label: 'Form Completion',
      fields: formCompletionFields,
    },
  ];

  const handleNext = async () => {
    handleSubmit(() => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    })();
  };

  const handleFinish = async () => {
    console.log(form.getValues());
    const postForm: any = form.getValues();
    fetch('/api/form', { method: 'post', body: postForm })
      .then((x) => {
        console.log(x.json());
      })
      .catch((e) => console.log(e));
  };

  const handleBack = async () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack direction="column" gap={5}>
        <FormProvider {...form}>
          <Card>
            <Box
              gradient="success"
              shadow="success"
              radius="lg"
              sx={{
                mx: 2,
                p: 1.5,
                mt: -2.5,
                mb: 3,
              }}
            >
              <Typography variant="h6">CREATE NEW FORM </Typography>
            </Box>
            <StyledStepper
              steps={steps}
              activeStep={activeStep}
              onBack={handleBack}
              onNext={handleNext}
              onFinish={handleFinish}
            >
              <Renderer field={steps[activeStep].fields}></Renderer>
            </StyledStepper>
          </Card>
        </FormProvider>
      </Stack>
    </Container>
  );
}

export default FormBuilder;
