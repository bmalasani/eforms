import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Avatar } from '../components/Avatar';

export const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'formName',
    headerName: 'Form',
    width: 150,
    editable: true,
  },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'approvers',
    headerName: 'Approvers',
    renderCell(params) {
      console.log(params);
      return (
        <>
          {params.value.map((x) => (
            <Avatar gradient bgColor="success">
              {x}
            </Avatar>
          ))}
        </>
      );
    },
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

export const rows = [
  { approvers: ['av', 'bg'], formName: 'test', id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  {
    approvers: ['av', 'bg'],
    formName: 'test',
    id: 2,
    lastName: 'Lannister',
    firstName: 'Cersei',
    age: 42,
  },
  {
    approvers: ['av', 'bg'],
    formName: 'test',
    id: 3,
    lastName: 'Lannister',
    firstName: 'Jaime',
    age: 45,
  },
  {
    approvers: ['av', 'bg'],
    formName: 'test',
    id: 4,
    lastName: 'Stark',
    firstName: 'Arya',
    age: 16,
  },
  {
    approvers: ['av', 'bg'],
    formName: 'test',
    id: 5,
    lastName: 'Targaryen',
    firstName: 'Daenerys',
    age: null,
  },
  {
    approvers: ['av', 'bg'],
    formName: 'test',
    id: 6,
    lastName: 'Melisandre',
    firstName: null,
    age: 150,
  },
  {
    approvers: ['av', 'bg'],
    formName: 'test',
    id: 7,
    lastName: 'Clifford',
    firstName: 'Ferrara',
    age: 44,
  },
  {
    approvers: ['av', 'bg'],
    formName: 'test',
    id: 8,
    lastName: 'Frances',
    firstName: 'Rossini',
    age: 36,
  },
  {
    approvers: ['av', 'bg'],
    formName: 'test',
    id: 9,
    lastName: 'Roxie',
    firstName: 'Harvey',
    age: 65,
  },
];
