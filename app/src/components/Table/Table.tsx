// @mui material components
import Table, { TableProps } from '@mui/material/Table';
import TableBody, { TableBodyProps } from '@mui/material/TableBody';
import TableContainer, { TableContainerProps } from '@mui/material/TableContainer';
import { Box } from '../Box';
import TableRow from '@mui/material/TableRow';
import TableHeadCell from './TableHeadCell';
import TableBodyCell from './TableBodyCell';
import { get } from '../../utils';

export type ColumnProps = {
  label: string;
  feildId?: string;
  render?: Function;
  renderHeader?: Function;
  width?: string;
  align?: 'left' | 'right' | 'center';
};

type TableCustomProps = {
  containerProps?: TableContainerProps;
  bodyProps?: TableBodyProps;
  tableProps?: TableProps;
  headers: ColumnProps[];
  noEndBorder?: boolean;
  rows: any[];
  [k: string]: any;
};

function DataTable({
  containerProps,
  bodyProps,
  tableProps,
  headers,
  rows,
  noEndBorder,
}: TableCustomProps) {
  return (
    <TableContainer {...containerProps}>
      <Table {...tableProps}>
        <Box component="thead">
          <TableRow>
            {headers.map((column, key) => (
              <TableHeadCell
                width={column.width ? column.width : 'auto'}
                align={column.align ? column.align : 'left'}
                key={key}
              >
                {column.renderHeader ? column.renderHeader() : column.label}
              </TableHeadCell>
            ))}
          </TableRow>
        </Box>
        <TableBody {...bodyProps}>
          {rows.map((row, key) => {
            return (
              <TableRow key={key}>
                {headers.map((cell, ind) => (
                  <TableBodyCell
                    noBorder={noEndBorder ? rows.length - 1 === key : false}
                    align={cell.align ? cell.align : 'left'}
                    key={ind}
                  >
                    {cell.render
                      ? cell.render(row, key)
                      : cell.feildId
                      ? get(row, cell.feildId, '')
                      : '--'}
                  </TableBodyCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// Setting default values for the props of DataTable
DataTable.defaultProps = {
  noEndBorder: false,
};

export default DataTable;
