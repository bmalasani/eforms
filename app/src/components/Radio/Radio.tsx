import Radio, { RadioProps } from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import { Control, FieldValues, useController } from 'react-hook-form';
import RadioGroup from '@mui/material/RadioGroup';

export type CustomRadioProps = RadioProps & {
  name: string;
  label: string;
  items: { label: string; value: any }[];
  control?: Control<FieldValues, any> | undefined;
  rules?: any;
  defaultValue?: any;
  helperText?: string;
};

function CustomRadio({
  name,
  control,
  rules,
  label,
  defaultValue,
  items,
  ...rest
}: CustomRadioProps) {
  const {
    field,
    fieldState: { error, isTouched, isDirty },
    formState: { touchedFields, dirtyFields },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  return (
    <FormControl required error={error !== undefined} variant="standard">
      {label && <FormLabel>{label}</FormLabel>}
      <RadioGroup {...field}>
        {items.map((i) => (
          <FormControlLabel key={i.label} value={i.value} control={<Radio />} label={i.label} />
        ))}
      </RadioGroup>
      <FormHelperText>{error === undefined ? rest.helperText : error.message}</FormHelperText>
    </FormControl>
  );
}

export default CustomRadio;
