import React from 'react';
<<<<<<< HEAD
import { useAuth0 } from '@auth0/auth0-react';
import Layout from '../components/Layout';
import AssessmentDisplay from '../components/assessments/AssessmentDisplay';
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
=======
import Layout from '../components/Layout';
import AssessmentQuiz from '../components/assessment/AssessmentQuiz';

const Assessment = () => {
  return (
    <Layout>
      <AssessmentQuiz />
>>>>>>> temp-assessment-branch
    </Layout>
  );
};

export default Assessment;

