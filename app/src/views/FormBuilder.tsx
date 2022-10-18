import { Add, DockRounded, ViewCompactOutlined } from '@mui/icons-material';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { useForm } from 'react-hook-form';
import { Box, StyledStepper, Typography } from '../components';
import { Builder } from '../components/Builder';
import { Card } from '../components/Cards';
import { TextField } from '../components/TextField';

function FormBuilder() {
  const { control, handleSubmit, trigger } = useForm();

  const handleNext = (callback: any) => {
    handleSubmit(() => {
      console.log('valid');
      callback && callback();
    })();
  };

  const renderNewForm = () => (
    <Stack
      direction="column"
      spacing={4}
      justifyContent="center"
      sx={{ margin: 'auto', width: { sm: '400px' } }}
    >
      <TextField
        control={control}
        rules={{ required: true }}
        name="formName"
        label="Form Name"
        variant="outlined"
      />
      <TextField
        control={control}
        rules={{ required: true }}
        name="formGroup"
        label="Form Group"
        variant="outlined"
      />
      <TextField
        multiline
        control={control}
        name="formDescription"
        label="Form Description"
        variant="outlined"
      />
    </Stack>
  );

  const steps: any = [
    {
      label: 'New Form',
      render: renderNewForm,
      icon: <Add />,
    },
    {
      label: 'Form Details',
      render: () => <Builder />,
      icon: <DockRounded />,
    },
    {
      label: 'Form Completion',
      render: renderNewForm,
      icon: <ViewCompactOutlined />,
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack direction="column" gap={5}>
        <Card>
          <Box
            gradient="info"
            shadow="info"
            radius="lg"
            sx={{
              mx: 2,
              p: 1.5,
              mt: -2.5,
            }}
          >
            <Typography variant="h6">Create New Form </Typography>
          </Box>
          <StyledStepper steps={steps} onNext={handleNext} />
        </Card>
      </Stack>
    </Container>
  );
}

export default FormBuilder;
