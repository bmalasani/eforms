import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Box } from '../Box';
import { Card } from '../Cards';
import { Typography } from '../Typography';
import { FormField } from './Fields';
import Renderer from './Renderer';

type PreviewProps = {
  field: FormField;
  open: boolean;
  handleClose: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Preview({ field, handleClose, open }: PreviewProps) {
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
    <Dialog
      PaperProps={{ sx: { background: '#f0f0f0' } }}
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <Container sx={{ mt: 10 }}>
        <Card sx={{ p: 2 }}>
          <Box
            gradient="info"
            shadow="info"
            radius="xl"
            sx={{ mx: 2, mt: -4, mb: 3, py: 1, px: 2 }}
          >
            <Typography variant="h3">Form Name</Typography>
          </Box>
          {renderChildren(field)}
        </Card>
      </Container>
    </Dialog>
  );
}

export default Preview;
