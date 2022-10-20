import { Control, FieldValues, useFieldArray } from 'react-hook-form';
import { Box } from '../Box';
import { FormField } from '.';
import IconButton from '@mui/material/IconButton';
import { Avatar } from '../Avatar';
import Icon from '@mui/material/Icon';
import Button from '@mui/material/Button';
import Renderer from './Renderer';
import { get } from '../../utils';

type FieldArrayProps = {
  control: Control<FieldValues, any> | undefined;
  [k: string]: any;
};
function FieldArray({ control, ...rest }: FieldArrayProps) {
  const { label, name, fields: childFields } = rest;

  const defaultValue = childFields.reduce((a: any, c: any) => {
    a[c.name] = get(c, 'defaultValue', '');
    return a;
  }, {});

  const { fields, append, remove } = useFieldArray({
    control,
    name: name,
  });

  return (
    <>
      <Box>
        <Button
          size="small"
          variant="outlined"
          onClick={() => {
            append({ ...defaultValue });
          }}
        >
          {`Add ${label}`}
        </Button>
      </Box>
      {fields.map((item, index) => {
        return (
          <Box key={item.id} display="flex" flexDirection="row" gap={4}>
            <>
              {childFields.map((f: FormField) => (
                <Renderer
                  control={control}
                  field={{
                    ...f,
                    props: { ...f.props, name: `${name}[${index}].${f.props['name']}` },
                  }}
                ></Renderer>
              ))}
            </>
            <IconButton onClick={() => remove(index)}>
              <Avatar sx={{ width: '24px', height: '24px' }} gradient="error" shadow="error">
                <Icon>remove</Icon>
              </Avatar>
            </IconButton>
          </Box>
        );
      })}
    </>
  );
}

export default FieldArray;
