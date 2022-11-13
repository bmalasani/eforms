import { Check } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { Box } from '../Box';

const Connector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.success.main,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.success.main,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const StepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
  ({ theme, ownerState }) => ({
    color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
    ...(ownerState.active && {
      color: theme.palette.success.main,
    }),
    '& .StepIcon-completedIcon': {
      color: theme.palette.success.main,
      zIndex: 1,
      fontSize: 18,
    },
    '& .StepIcon-circle': {
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: 'currentColor',
    },
  })
);

function StepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  return (
    <StepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="StepIcon-completedIcon" />
      ) : (
        <div className="StepIcon-circle" />
      )}
    </StepIconRoot>
  );
}

export interface StyledStepperProps {
  steps: {
    label: string;
  }[];
  children?: any;
  activeStep: number;
  onNext?: any;
  onBack?: any;
  onFinish?: any;
}

function StyledStepper({
  steps,
  children,
  activeStep,
  onNext,
  onBack,
  onFinish,
}: StyledStepperProps) {
  return (
    <Stack component={Container} direction="column" spacing={4} sx={{ mt: 3 }}>
      <Stepper alternativeLabel activeStep={activeStep} connector={<Connector />}>
        {steps.map((s) => (
          <Step key={s.label}>
            <StepLabel StepIconComponent={StepIcon}>{s.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ width: '100%', p: 2 }}>{children}</Box>
      <Divider />
      <Box sx={{ display: 'flex', flexDirection: 'row', p: 3, pt: 0 }}>
        <Button
          sx={{ borderRadius: 10 }}
          variant="outlined"
          color="success"
          disabled={activeStep === 0}
          onClick={onBack}
        >
          Back
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button
          disabled={activeStep === steps.length}
          sx={{ borderRadius: 10 }}
          color="success"
          variant="contained"
          onClick={() => (activeStep < steps.length - 1 ? onNext() : onFinish())}
        >
          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </Box>
    </Stack>
  );
}

export default StyledStepper;
