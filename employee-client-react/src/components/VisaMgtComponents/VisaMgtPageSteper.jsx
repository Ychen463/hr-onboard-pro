import { Stepper, Step, StepLabel } from '@mui/material';

const steps = ['OPT RECEIPT', 'OPT EAD', 'I983', 'I20'];

function VisaMgtPageSteper({ status }) {
  const activeStep = steps.indexOf(status);

  return (
    <div style={{ marginTop: '2rem' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}

export default VisaMgtPageSteper;
