import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Layout from '../components/Layout';
// import AssessmentDisplay from '../components/assessments/AssessmentDisplay';
import AssessmentDisplay from '../components/assessment/Assessment';
import LoginButton from '../components/LoginButton';
import Loading from './Loading';

const Assessment = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return (
      <Layout>
        <div style={{ textAlign: 'center', marginTop: '80px' }}>
          <h2>You must be signed in to access this assessment.</h2>
          <LoginButton />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <AssessmentDisplay />
    </Layout>
  );
};

export default Assessment;

