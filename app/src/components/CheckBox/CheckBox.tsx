import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import { Control, FieldValues, useController } from 'react-hook-form';

export type CustomCheckboxProps = CheckboxProps & {
  name: string;
  label: string;
  control?: Control<FieldValues, any> | undefined;
  rules?: any;
  defaultValue?: any;
  helperText?: string;
};

function CustomCheckbox({ name, control, rules, defaultValue, ...rest }: CustomCheckboxProps) {
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
      <FormGroup>
        <FormControlLabel control={<Checkbox {...field} />} label={rest.label} />
      </FormGroup>
      <FormHelperText>{error === undefined ? rest.helperText : error.message}</FormHelperText>
    </FormControl>
  );
}

export default CustomCheckbox;
