import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
  { field: 'parentName', headerName: 'Parent Name', width: 150 },
  { field: 'phoneNumber', headerName: 'Phone Number', width: 150 },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35, parentName: 'Rhaegar Targaryen', phoneNumber: '555-0101' },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42, parentName: 'Tywin Lannister', phoneNumber: '555-0102' },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45, parentName: 'Tywin Lannister', phoneNumber: '555-0103' },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16, parentName: 'Eddard Stark', phoneNumber: '555-0104' },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null, parentName: 'Aerys II Targaryen', phoneNumber: '555-0105' },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150, parentName: 'Unknown', phoneNumber: '555-0106' },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44, parentName: 'John Clifford', phoneNumber: '555-0107' },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36, parentName: 'Gioachino Rossini', phoneNumber: '555-0108' },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65, parentName: 'William Harvey', phoneNumber: '555-0109' },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable() {
  const navigate = useNavigate();

  const handleRowClick = (params) => {
    navigate(`/user/${params.id}`, { state: { user: params.row } });
  };

  return (
    <Paper sx={{ height: 400, width: '100%', backgroundColor: '#182c87' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        onRowClick={handleRowClick}
        sx={{
          border: 0,
          color: 'rgba(255, 255, 255, 0.87)',
          '& .MuiDataGrid-row': {
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: 'rgba(102, 126, 234, 0.1)',
            },
          },
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#120c3f',
            borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: '1px solid rgba(255, 255, 255, 0.12)',
          },
          '& .MuiCheckbox-root': {
            color: 'rgba(255, 255, 255, 0.7)',
          },
          '& .MuiDataGrid-row.Mui-selected': {
            backgroundColor: 'rgba(102, 126, 234, 0.2)',
            '&:hover': {
              backgroundColor: 'rgba(102, 126, 234, 0.3)',
            },
          },
        }}
      />
    </Paper>
  );
}