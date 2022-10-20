import Button from '@mui/material/Button';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormField } from '.';
import { first } from '../../utils';
import { Box } from '../Box';
import Preview from './Preview';
import Renderer from './Renderer';

function Builder() {
  const { control } = useForm<any>();
  const formMain: FormField = {
    key: '0',
    type: 'main',
    props: {},
    children: [],
  };
  const [details, setDetails] = useState<FormField>(formMain);
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
        return { ...ps };
      });
    };

  const renderChildren = (field: FormField, key?: string | number) => (
    <Renderer control={control} isDesign onSaveField={handleOnSave(field)} field={field} key={key}>
      <>
        {field.children &&
          field.children.map((f, i) => {
            return renderChildren(f, `${f.key || ''}${i}`);
          })}
      </>
    </Renderer>
  );

  return (
    <Box display="flex" flexDirection="column" flex="1">
      <Box display="flex" flexDirection="row-reverse">
        <Button variant="outlined" color="info" onClick={() => setOpen(true)}>
          Preivew
        </Button>
      </Box>
      {renderChildren(details)}
      <Preview field={details} handleClose={() => setOpen(false)} open={open}></Preview>
    </Box>
  );
}

export default Builder;
