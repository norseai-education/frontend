


import React, { Suspense, lazy } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Layout from '../components/Layout';
import Loading from './Loading';
import LoginButton from '../components/LoginButton';
import { Box, Typography } from '@mui/material';
import DashboardSkeleton from '../components/dashboard/DashboardSkeleton';

const DashboardDisplay = lazy(() => import('../components/dashboard/DashboardDisplay'));

const Dashboard = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return (
      <Layout>
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            You must be signed in to view the dashboard.
          </Typography>
          <LoginButton />
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardDisplay />
      </Suspense>
    </Layout>
  );
};

export default Dashboard;