import { Control, FieldValues, useFieldArray } from 'react-hook-form';
import { Box } from '../Box';
import { FormField } from '.';
import IconButton from '@mui/material/IconButton';
import { Avatar } from '../Avatar';
import Icon from '@mui/material/Icon';
import Button from '@mui/material/Button';
import Renderer from './Renderer';
import { get } from '../../utils';
import { SxProps, Theme } from '@mui/material/styles';

type FieldArrayProps = {
  control: Control<FieldValues, any> | undefined;
  boxSX?: SxProps<Theme>;
  [k: string]: any;
};
function FieldArray({ control, ...rest }: FieldArrayProps) {
  const { label, name, fields: childFields, boxSX } = rest;

  const defaultValue = childFields?.reduce((a: any, c: any) => {
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
          {`${label}`}
        </Button>
      </Box>
      {fields.map((item, index) => {
        return (
          <Box key={item.id} display="flex" flexDirection="row" gap={4}>
            <Box display="flex" flexDirection="row" gap={2} sx={{ ...boxSX }}>
              {childFields?.map((f: FormField) => (
                <Renderer
                  control={control}
                  field={{
                    ...f,
                    props: { ...f.props, name: `${name}[${index}].${f.props['name']}` },
                  }}
                ></Renderer>
              ))}
            </Box>
            <Box>
              <IconButton onClick={() => remove(index)}>
                <Avatar sx={{ width: '24px', height: '24px' }} gradient="error" shadow="error">
                  <Icon>remove</Icon>
                </Avatar>
              </IconButton>
            </Box>
          </Box>
        );
      })}
    </>
  );
}

export default FieldArray;
