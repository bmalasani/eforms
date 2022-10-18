import { Box } from '../Box';

type BodyCellProps = {
  noBorder: boolean;
  children: any;
  align: 'left' | 'right' | 'center';
  [k: string]: any;
};

function TableBodyCell({ noBorder, align, children }: BodyCellProps) {
  return (
    <Box
      component="td"
      textAlign={align}
      py={1.5}
      px={3}
      sx={(theme) => ({
        fontSize: theme.typography.pxToRem(14),
        borderBottom: noBorder ? 'none' : `1px solid ${theme.palette.grey[100]}`,
      })}
    >
      <Box display="inline-block" width="max-content" color="text" sx={{ verticalAlign: 'middle' }}>
        {children}
      </Box>
    </Box>
  );
}

TableBodyCell.defaultProps = {
  noBorder: false,
  align: 'left',
};


export default TableBodyCell;
