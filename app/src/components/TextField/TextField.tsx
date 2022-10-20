import TextField, { TextFieldProps } from '@mui/material/TextField';
import { Control, FieldValues, useController, UseControllerProps } from 'react-hook-form';

export type CustomTextFieldProps = TextFieldProps & {
  name: string;
  control?: Control<FieldValues, any> | undefined;
  rules?: UseControllerProps['rules'];
  defaultValue?: any;
};

function CustomTextField({ name, control, rules, defaultValue, ...rest }: CustomTextFieldProps) {
  const {
    field: { onChange, onBlur, name: fieldName, value, ref },
    fieldState: { error, isTouched, isDirty },
    formState: { touchedFields, dirtyFields },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  return (
    <TextField
      variant='outlined'
      fullWidth
      size='small'
      {...rest}
      error={error !== undefined}
      helperText={error === undefined ? rest.helperText : error.message}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      name={fieldName}
      inputRef={ref}
    />
  );
}

export default CustomTextField;
