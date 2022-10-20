import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Await, useLoaderData } from 'react-router-dom';
import { Box, Typography } from '../components';
import { FormField, Renderer } from '../components/Builder';
import { FormSkeleton } from '../skeletons';

function FormViewer() {
  const { form }: any = useLoaderData();
  const { control } = useForm<any>();

  const renderChildren = (field: FormField, key?: string | number) => (
    <Renderer control={control} field={field} key={key}>
      <>
        {field.children &&
          field.children.map((f, i) => {
            return renderChildren(f, `${f.key || ''}${i}`);
          })}
      </>
    </Renderer>
  );
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Card sx={{ p: 2 }}>
        <React.Suspense fallback={<FormSkeleton />}>
          <Await resolve={form}>
            {(form) => (
              <>
                {console.log(form)}
                <Box
                  gradient="info"
                  shadow="info"
                  radius="xl"
                  sx={{ mx: 2, mt: -4, mb: 3, py: 1, px: 2 }}
                >
                  <Typography variant="h3">{form.core.formName}</Typography>
                </Box>
                {renderChildren(form.formDetails)}
              </>
            )}
          </Await>
        </React.Suspense>
        <Divider sx={{ my: 3 }} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row-reverse',
            flex: 1,
            p: 1,
            gap: 2,
          }}
        >
          <Button variant="contained" color="info">
            Submit
          </Button>
          <Button variant="outlined" color="warning">
            Cancel
          </Button>
        </Box>
      </Card>
    </Container>
  );
}

export default FormViewer;
