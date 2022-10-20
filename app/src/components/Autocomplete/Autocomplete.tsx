import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { Control, FieldValues, useController, UseControllerProps } from 'react-hook-form';

export interface CustomAutocompleteProps {
  name: string;
  control?: Control<FieldValues, any> | undefined;
  rules?: UseControllerProps['rules'];
  label: string;
  items?: { label: string; value: any }[];
  defaultValue?: any;
  helperText?: any;
  lookup?: any;
}

function CustomAutocomplete({
  name,
  control,
  rules,
  defaultValue,
  label,
  lookup,
  items,
  ...rest
}: CustomAutocompleteProps) {
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

  const [options, setOptions] = useState<any>(items);

  useEffect(() => {
    if (lookup) {
    }
  }, [lookup]);

  return (
    <Autocomplete
      {...rest}
      fullWidth
      onChange={onChange}
      onBlur={onBlur}
      size="small"
      value={value}
      options={options}
      renderTags={(value: readonly string[], getTagProps) => (
        <>
          {value.map((option: string, index: number) => (
            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
          ))}
        </>
      )}
      renderInput={(params) => (
        <TextField
          variant="outlined"
          {...params}
          name={fieldName}
          inputRef={ref}
          error={error !== undefined}
          helperText={error === undefined ? rest.helperText : error.message}
          label={label}
        />
      )}
    />
  );
}

export default CustomAutocomplete;
