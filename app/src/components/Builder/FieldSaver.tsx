import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { FieldTypes, FormField } from '.';
import { Avatar } from '../Avatar';
import { Box } from '../Box';
import { Select } from '../Select';
import { TextField } from '../TextField';

type FieldSaverProps = {
  field: FormField;
  isEdit?: boolean;
  onSave?: (x: FormField[], isEdit?: boolean) => void;
};

function FieldSaver({ field, onSave, isEdit }: FieldSaverProps) {
  const defaultValues = !isEdit
    ? { key: `${field.key}${(field.children?.length || 0) + 1}`, props: [], type: '', count: 1 }
    : {
        key: field.key,
        props: Object.entries(field.props || {}).map((v) => ({ name: v[0], value: v[1] })),
        type: field.type,
        count: 1,
      };
  const { control, handleSubmit, getValues } = useForm<any>({
    defaultValues: { ...defaultValues },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'props',
  });

  const handleSave = () => {
    onSave &&
      handleSubmit((values) => {
        const fc = [...Array(parseInt(values.count) || 1).keys()].map((i) => ({
          key: `${field.key}${(field.children?.length || 0) + i}`,
          type: values.type,
          children: [],
          props: values.props
            ? values.props.reduce((a: any, c: any) => {
                a[c.name] = c.value;
                return a;
              }, {})
            : {},
        }));
        onSave(fc, isEdit);
      })();
  };

  const items = FieldTypes.map((x) => ({ label: x, value: x }));

  const renderChildren = () => (
    <Box display="flex" flexDirection="column" gap={4}>
      <TextField control={control} label={`Key`} name={'key'} disabled />
      <Select
        disabled={isEdit}
        control={control}
        label={'Add Child'}
        name={'type'}
        rules={{ required: true }}
        items={items}
      ></Select>
      <Box>
        <TextField
          disabled={isEdit}
          control={control}
          size="small"
          type="number"
          label="Count"
          name={`count`}
        />
      </Box>
      <Box>
        <Button
          size="small"
          variant="outlined"
          onClick={() => {
            append({ name: '', value: '' });
          }}
        >
          Add Property
        </Button>
      </Box>
      {fields.map((item, index) => {
        return (
          <Box key={item.id} display="flex" flexDirection="row" gap={4}>
            <TextField
              control={control}
              size="small"
              label="Property Name"
              name={`props[${index}].name`}
            />
            <TextField
              control={control}
              size="small"
              label="Property Value"
              name={`props[${index}].value`}
            />
            <IconButton onClick={() => remove(index)}>
              <Avatar sx={{ width: '24px', height: '24px' }} gradient="error" shadow="error">
                <Icon>remove</Icon>
              </Avatar>
            </IconButton>
          </Box>
        );
      })}
    </Box>
  );

  return (
    <Box>
      <Box sx={{ mb: 2 }}>{renderChildren()}</Box>
      <Divider />
      <Box sx={{ mt: 1 }} display="flex" flexDirection="row-reverse">
        <Button onClick={handleSave}>Save</Button>
      </Box>
    </Box>
  );
}

export default FieldSaver;
