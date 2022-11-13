import { Close } from '@mui/icons-material';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
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
  formName: string;
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

function Preview({ field, handleClose, open, formName }: PreviewProps) {
  const { control } = useForm<any>();

  return (
    <Dialog
      PaperProps={{ sx: { background: '#f0f0f0' } }}
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <DialogTitle>
        {'Preview Form'}
        {handleClose ? (
          <IconButton
            aria-label="close"
            onClick={handleClose as any}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>
        ) : null}
      </DialogTitle>
      <Container sx={{ mt: 10 }}>
        <Card sx={{ p: 2 }}>
          <Box
            gradient="info"
            shadow="info"
            radius="xl"
            sx={{ mx: 2, mt: -4, mb: 3, py: 1, px: 2 }}
          >
            <Typography variant="h3">{formName}</Typography>
          </Box>
          <Renderer control={control} field={field} />
        </Card>
      </Container>
    </Dialog>
  );
}

export default Preview;
