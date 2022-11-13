import { useState } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import Button from '@mui/material/Button';
import { FormField } from '.';
import { Box } from '../Box';
import Preview from './Preview';
import Designer from './Designer';
import { first } from '../../utils';

function Builder() {
  const { control } = useForm<any>();
  const { setValue, getValues } = useFormContext();

  const formMain: FormField = {
    key: '0',
    type: 'main',
    props: {},
    children: [],
  };

  const formDetails = getValues('formDetails') || formMain;

  const formName = getValues('formName') || '--';

  const [details, setDetails] = useState<FormField>(formDetails);

  const [open, setOpen] = useState(false);

  const findChildField = (field: FormField, key: string | number): FormField | null => {
    if (field.key === key) {
      return field;
    } else if (field.children) {
      return first(
        field.children.map((x) => findChildField(x, key)).filter((y) => y),
        null
      );
    }
    return null;
  };

  const findParentField = (field: FormField, key: string | number): FormField | null => {
    if (field.children?.some((x) => x.key === key)) {
      return field;
    } else if (field.children) {
      return first(
        field.children.map((x) => findParentField(x, key)).filter((y) => y),
        null
      );
    }
    return null;
  };

  const handleOnSave =
    (field: FormField) => (fc: FormField[], isEdit?: boolean, isRemove?: boolean) => {
      setDetails((ps) => {
        if (!isRemove) {
          const f = findChildField(ps, field.key);
          if (f) {
            if (!f.children) f.children = [];
            if (!isEdit) {
              f.children.push(...fc);
            } else {
              f.props = { ...fc[0].props };
            }
          }
        } else {
          const f = findParentField(ps, field.key);
          if (f) {
            const ind = f.children?.findIndex((x) => x.key === field.key);
            if (ind !== undefined && ind >= 0) f.children?.splice(ind, 1);
          }
        }
        setValue('formDetails', { ...ps });
        return { ...ps };
      });
    };

  const renderChildren = (field: FormField, key?: string | number) => (
    <Designer control={control} onSaveField={handleOnSave(field)} field={field} key={key}>
      <>
        {field.children &&
          field.children.map((f, i) => {
            return renderChildren(f, `${f.key || ''}${i}`);
          })}
      </>
    </Designer>
  );

  return (
    <Box display="flex" flexDirection="column" flex="1">
      <Box display="flex" flexDirection="row-reverse">
        <Button variant="outlined" color="info" onClick={() => setOpen(true)}>
          Preivew
        </Button>
      </Box>
      {renderChildren(details)}
      <Preview
        formName={formName}
        field={details}
        handleClose={() => setOpen(false)}
        open={open}
      ></Preview>
    </Box>
  );
}

export default Builder;
