import React from 'react';
import { Container } from '@mui/material';
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
          <h2>You must be signed in to access the admin dashboard.</h2>
          <LoginButton />
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container>
        <DashboardLayout />
        <Table />
      </Container>
    </Layout>
  );
};
export default Admin;
