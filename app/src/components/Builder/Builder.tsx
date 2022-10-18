import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormField } from '.';
import { first } from '../../utils';
import { Autocomplete } from '../Autocomplete';
import { Box } from '../Box';
import { CheckBox } from '../CheckBox';
import { DatePicker } from '../DatePicker';
import { Radio } from '../Radio';
import { Select } from '../Select';
import { Switch } from '../Switch';
import { TextField } from '../TextField';
import { TimePicker } from '../TimePicker';
import Outer from './Outer';

function Builder() {
  const { control } = useForm<any>();
  const formMain: FormField = {
    key: '0',
    type: 'main',
    props: {},
    children: [],
  };
  const [details, setDetails] = useState<FormField>(formMain);

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
      for (let i = 0; i < field.children.length; i++) {
        return findParentField(field.children[i], key);
      }
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

  const renderChildren = (field: FormField, key?: string | number) => {
    switch (field.type) {
      case 'main':
        return (
          <Outer key={key} onSaveField={handleOnSave(field)} field={field}>
            <Box sx={{ display: 'flex', flex: '1', flexDirection: 'column' }}>
              <>{field.children?.map((fc, i) => renderChildren(fc, i))}</>
            </Box>
          </Outer>
        );
      case 'row':
        return (
          <Grid key={key} container {...field.props}>
            <Outer onSaveField={handleOnSave(field)} field={field} editable>
              <>{field.children?.map((fc, i) => renderChildren(fc, i))}</>
            </Outer>
          </Grid>
        );

      case 'column':
        return (
          <Grid key={key} item xs={12} {...field.props}>
            <Outer onSaveField={handleOnSave(field)} field={field} editable>
              <>{field.children?.map((fc, i) => renderChildren(fc, i))}</>
            </Outer>
          </Grid>
        );

      case 'text':
        return (
          <Outer key={key} onSaveField={handleOnSave(field)} disableActions editable field={field}>
            <TextField control={control} name="" {...field.props} />
          </Outer>
        );

      case 'check':
        return (
          <Outer key={key} onSaveField={handleOnSave(field)} disableActions editable field={field}>
            <CheckBox control={control} label={''} name="" {...field.props} />
          </Outer>
        );

      case 'radio':
        return (
          <Outer key={key} onSaveField={handleOnSave(field)} disableActions editable field={field}>
            <Radio items={[]} control={control} label={''} name="" {...field.props} />
          </Outer>
        );

      case 'switch':
        return (
          <Outer key={key} onSaveField={handleOnSave(field)} disableActions editable field={field}>
            <Switch control={control} label={''} name="" {...field.props} />
          </Outer>
        );

      case 'select':
        return (
          <Outer key={key} onSaveField={handleOnSave(field)} disableActions editable field={field}>
            <Select control={control} label={''} items={[]} name="" {...field.props} />
          </Outer>
        );

      case 'lookup':
        return (
          <Outer onSaveField={handleOnSave(field)} disableActions editable field={field}>
            <Autocomplete control={control} label={''} items={[]} name="" {...field.props} />
          </Outer>
        );

      case 'label':
        return (
          <Outer onSaveField={handleOnSave(field)} disableActions editable field={field}>
            <FormLabel component="label">{}</FormLabel>
          </Outer>
        );

      case 'date':
        return (
          <Outer onSaveField={handleOnSave(field)} disableActions editable field={field}>
            <DatePicker control={control} label={''} name="" {...field.props} />
          </Outer>
        );

      case 'time':
        return (
          <Outer onSaveField={handleOnSave(field)} disableActions editable field={field}>
            <TimePicker control={control} label={''} name="" {...field.props} />
          </Outer>
        );

      default:
        return <Box gradient="error"> Error !</Box>;
    }
  };

  return renderChildren(details);
}

export default Builder;
