import React from 'react';
import Layout from '../components/Layout';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const GeometryAssessment = () => {
  return (
    <Layout>
      <h1>Geometry Assessment</h1>
      <Button component={Link} to="/dashboard">Back to Dashboard</Button>
    </Layout>
  );
};

export default GeometryAssessment;
