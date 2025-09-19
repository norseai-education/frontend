import React from 'react';
import { Container, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Layout from '../components/Layout';
import DashboardLayout from '../components/admin/DashboardLayout';
import Table from '../components/admin/Table';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from '../components/LoginButton';
import Loading from './Loading';

const Admin = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return (
      <Layout>
        <Container sx={{ textAlign: 'center', mt: 8 }}>
          <h2>You must be signed in to access the Admin Dashboard.</h2>
          <LoginButton />
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <DashboardLayout></DashboardLayout>
      <Container>
        <Button component={RouterLink} to="/" variant="outlined" sx={{ mt: 2 }}>Return to App</Button>
        <h1>Admin Dashboard</h1>
        <Table />
      </Container>
    </Layout>
  );
};
export default Admin;
