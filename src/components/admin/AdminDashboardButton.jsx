import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const AdminDashboardButton = () => {
  const { user } = useAuth0();
  const isAdmin = user && user['https://norseai.com/roles']?.includes('admin');

  if (isAdmin) {
    return (
      <Button color="inherit" component={Link} to="/admin">
        Admin Dashboard
      </Button>
    );
  }

  return null;
};

export default AdminDashboardButton;
