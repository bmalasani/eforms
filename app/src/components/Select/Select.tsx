import Select, { SelectProps } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import { Control, FieldValues, useController, UseControllerProps } from 'react-hook-form';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

export type CustomSelectProps = SelectProps & {
  name: string;
  label: string;
  items: { label: string; value: any }[];
  control?: Control<FieldValues, any> | undefined;
  rules?: UseControllerProps['rules'];
  defaultValue?: any;
  helperText?: string;
};

function CustomSelect({ name, control, rules, defaultValue, items, ...rest }: CustomSelectProps) {
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
    <FormControl fullWidth error={error !== undefined} variant="standard" size='small' disabled={rest.disabled}>
      <InputLabel variant='outlined' size='small'>{rest.label}</InputLabel>
      <Select variant="outlined" size='small' fullWidth {...rest} {...field}>
        <MenuItem disabled value=""></MenuItem>
        {items.map((i) => (
          <MenuItem key={i.label} value={i.value}>
            {i.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{error === undefined ? rest.helperText : error.message}</FormHelperText>
    </FormControl>
  );
}

export default CustomSelect;
