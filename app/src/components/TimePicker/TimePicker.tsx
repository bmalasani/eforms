import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker, TimePickerProps } from '@mui/x-date-pickers/TimePicker';
import { Control, FieldValues, useController, UseControllerProps } from 'react-hook-form';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';

export interface CustomTimePickerProps  {
  name: string;
  control?: Control<FieldValues, any> | undefined;
  rules?: UseControllerProps['rules'];
  label: string;
  defaultValue?: any;
  helperText?: any;
}

function CustomTimePicker({
  name,
  control,
  rules,
  defaultValue,
  label,
  ...rest
}: CustomTimePickerProps) {
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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        label={label}
        value={value}
        onChange={onChange}
        renderInput={(params) => (
          <TextField
            {...params}
            name={fieldName}
            inputRef={ref}
            error={error !== undefined}
            helperText={error === undefined ? rest.helperText : error.message}
          />
        )}
      />
    </LocalizationProvider>
  );
}

export default CustomTimePicker;
