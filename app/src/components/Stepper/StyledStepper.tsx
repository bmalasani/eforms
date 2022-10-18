import { Check } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
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
      borderColor: theme.palette.primary.main,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.main,
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
      color: theme.palette.primary.main,
    }),
    '& .StepIcon-completedIcon': {
      color: theme.palette.primary.main,
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
    icon?: string;
    render?: Function;
  }[];
  children?: any;
  onNext?: Function;
  onBack?: Function;
  onFinish?: Function;
}

function StyledStepper({ steps, children, onNext, onBack, onFinish }: StyledStepperProps) {
  const [activeStep, setActiveStep] = useState(0);
  const handleNext = async () => {
    if (steps.length === activeStep + 1) {
      onFinish && (await onFinish());
    } else {
      if (onNext) await onNext(() => setActiveStep((prevActiveStep) => prevActiveStep + 1));
      else setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = async () => {
    if (onBack) await onBack(() => setActiveStep((prevActiveStep) => prevActiveStep - 1));
    else setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Stack component={Container} direction="column" spacing={4} sx={{ mt: 3 }}>
      <Stepper alternativeLabel activeStep={activeStep} connector={<Connector />}>
        {steps.map((s) => (
          <Step key={s.label}>
            <StepLabel icon={s.icon} StepIconComponent={StepIcon}>
              {s.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ width: '100%' }}>
        {steps[activeStep].render ? steps[activeStep].render!() : children}
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
          Back
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button onClick={handleNext}>{activeStep === steps.length - 1 ? 'Finish' : 'Next'}</Button>
      </Box>
    </Stack>
  );
}

export default StyledStepper;
