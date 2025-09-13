import React from 'react';
import { Container } from '@mui/material';
import Layout from '../components/Layout';
import DashboardLayout from '../components/admin/DashboardLayout';
import Table from '../components/admin/Table';

const Admin = () => {
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
