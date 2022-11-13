import { FilterOptionsState } from '@mui/material';
import Autocomplete, {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  createFilterOptions,
} from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { Control, FieldValues, useController, UseControllerProps } from 'react-hook-form';

const filter = createFilterOptions<any>();
export interface CustomAutocompleteProps {
  name: string;
  control?: Control<FieldValues, any> | undefined;
  rules?: UseControllerProps['rules'];
  label: string;
  items?: { label: string; value: any }[];
  defaultValue?: any;
  helperText?: any;
  lookup?: any;
  creatable?: boolean;
}

function CustomAutocomplete({
  name,
  control,
  rules,
  defaultValue,
  label,
  lookup,
  items,
  creatable,
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

  const filterOptions = (options: any[], params: FilterOptionsState<any>) => {
    const filtered = filter(options, params);
    const { inputValue } = params;
    if (filtered.length <= 0 && inputValue != '') {
      filtered.push({
        label: inputValue,
        value: inputValue,
      });
    }
    return filtered;
  };

  const handleOnChange = (event: React.SyntheticEvent<Element, Event>, value: any) => {
    if (typeof value === 'string') {
      onChange({ label: value, value: value });
    } else {
      onChange(value);
    }
  };

  return (
    <Autocomplete
      {...rest}
      {...(creatable && {
        filterOptions,
      })}
      fullWidth
      onChange={handleOnChange}
      onBlur={onBlur}
      size="small"
      value={value}
      options={options}
      renderTags={(value: readonly any[], getTagProps) => {
        return (
          <>
            {value.map((option: any, index: number) => (
              <Chip variant="outlined" label={option.label} {...getTagProps({ index })} />
            ))}
          </>
        );
      }}
      renderInput={(params) => (
        <TextField
          variant="outlined"
          name={fieldName}
          inputRef={ref}
          error={error !== undefined}
          helperText={error === undefined ? rest.helperText : error.message}
          label={label}
          {...params}
        />
      )}
    />
  );
}

export default CustomAutocomplete;
