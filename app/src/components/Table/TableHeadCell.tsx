// @mui material components
import Icon from '@mui/material/Icon';
import { Box } from '../Box';

type HeadCellProps = {
  width: string;
  children: any;
  align: 'left' | 'right' | 'center';
  sorted?: false | 'none' | 'asce' | 'desc';
  [k: string]: any;
};

function TableHeadCell({ width, children, sorted, align, ...rest }: HeadCellProps) {
  return (
    <Box
      component="th"
      width={width}
      py={1.5}
      px={3}
      sx={{
        borderBottom: `1px solid #f4f`,
      }}
    >
      <Box
        position="relative"
        textAlign={align}
        opacity={0.7}
        sx={(theme) => ({
          fontSize: theme.typography.pxToRem(10.4),
          fontWeight: theme.typography.fontWeightBold,
          textTransform: 'uppercase',
          ...(sorted && {
            cursor: 'pointer',
            userSelect: 'none',
          }),
        })}
        {...rest}
      >
        {children}
        {sorted && (
          <Box
            position="absolute"
            top={0}
            right={align !== 'right' ? '16px' : 0}
            left={align === 'right' ? '-5px' : 'unset'}
            sx={(theme) => ({
              fontSize: theme.typography.pxToRem(18),
            })}
          >
            <Box
              position="absolute"
              top={-6}
              color={sorted === 'asce' ? 'text' : 'secondary'}
              opacity={sorted === 'asce' ? 1 : 0.5}
            >
              <Icon>arrow_drop_up</Icon>
            </Box>
            <Box
              position="absolute"
              top={0}
              color={sorted === 'desc' ? 'text' : 'secondary'}
              opacity={sorted === 'desc' ? 1 : 0.5}
            >
              <Icon>arrow_drop_down</Icon>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

TableHeadCell.defaultProps = {
  width: 'auto',
  align: 'left',
};

export default TableHeadCell;
