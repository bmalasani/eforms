import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { FormField } from '.';
import { get } from '../../utils';
import { Box } from '../Box';
import { Select } from '../Select';
import { TextField } from '../TextField';
import { Fields } from './Fields';
import Renderer from './Renderer';

type FieldSaverProps = {
  field: FormField;
  isEdit?: boolean;
  onSave?: (x: FormField[], isEdit?: boolean) => void;
};

function FieldSaver({ field, onSave, isEdit }: FieldSaverProps) {
  const defaultValues = useMemo(
    () =>
      !isEdit
        ? { key: `${field.key}${(field.children?.length || 0) + 1}`, props: [], type: '', count: 1 }
        : {
            key: field.key,
            count: field.props['count'] || 1,
            props: Object.entries(field.props || {})
              .filter(
                (v) =>
                  !get(Fields[field.type], 'fields', []).some((f: any) => f.props['name'] === v[0])
              )
              .map((v) => ({ name: v[0], value: v[1] })),
            type: field.type,
            ...get(Fields[field.type], 'fields', []).reduce((a: any, c: any) => {
              if (c && c.props && c.props['name'])
                a[c.props['name']] = get(field.props, c.props['name'], '');
              return a;
            }, {}),
          },
    [isEdit, field]
  );

  const { control, handleSubmit, watch } = useForm<any>({
    defaultValues: { ...defaultValues },
  });

  const items = useMemo(
    () =>
      isEdit
        ? [{ label: field.type, value: field.type }]
        : Fields[field.type].childrenTypes.map((x) => ({ label: x, value: x })),
    [isEdit, field]
  );

  const childType = watch('type');
  const SaverFields = childType && Fields[childType as FormField['type']].fields;
  const canAddMore = childType && Fields[childType as FormField['type']]?.canAddMultiple;

  const renderSaver = () => (
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
      {canAddMore && (
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
      )}
      {SaverFields &&
        SaverFields.map((f: FormField) => (
          <Renderer key={f.key} control={control} field={f}></Renderer>
        ))}
    </Box>
  );

  const handleSave = () => {
    onSave &&
      handleSubmit((values) => {
        if (!values) return;
        const fc = [...Array(parseInt(values.count) || 1).keys()].map((i) => ({
          key: `${field.key}${(field.children?.length || 0) + i}`,
          type: values.type,
          children: [],
          props: {
            count: values.count,
            ...(values.props
              ? values.props.reduce((a: any, c: any) => {
                  a[c.name] = c.value;
                  return a;
                }, {})
              : {}),
            ...Object.entries(values).reduce((a: any, c) => {
              if (!['key', 'type', 'count', 'props'].includes(c[0])) a[c[0]] = c[1];
              return a;
            }, {}),
          },
        }));
        onSave(fc, isEdit);
      })();
  };

  return (
    <Box>
      <Box sx={{ mb: 2 }}>{renderSaver()}</Box>
      <Divider />
      <Box sx={{ mt: 1 }} display="flex" flexDirection="row-reverse">
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </Box>
    </Box>
  );
}

export default FieldSaver;
