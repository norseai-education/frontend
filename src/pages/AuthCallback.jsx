import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Typography, Container } from '@mui/material';
import Layout from '../components/Layout';

/**
 * A mock function to check the user's assessment status.
 * Replace this with a real API call to your backend.
 * @param {string} userId - The unique identifier for the user (e.g., user.sub).
 * @returns {Promise<boolean>} - A promise that resolves to true if the assessment is complete.
 */
const checkAssessmentStatus = async (userId) => {
  console.log(`Checking assessment status for user: ${userId}`);
  // --- START: REPLACE WITH YOUR API CALL ---
  // Example:
  // const response = await fetch(`https://your-api.com/user/${userId}/assessment-status`);
  // const data = await response.json();
  // return data.isComplete;
  
  // For demonstration, we'll return a random status.
  // In a real app, this would be a consistent value from your database.
  return Promise.resolve(Math.random() > 0.5);
  // --- END: REPLACE WITH YOUR API CALL ---
};

/**
 * This page handles the post-login redirection logic.
 * It checks the user's status and redirects them to the appropriate dashboard.
 */
const AuthCallback = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    // Only run this logic if authentication is complete and we have a user object.
    if (!isLoading && isAuthenticated && user) {
      const handleRedirect = async () => {
        try {
          const hasCompletedAssessment = await checkAssessmentStatus(user.sub);
          
          if (hasCompletedAssessment) {
            navigate('/dashboard');
          } else {
            navigate('/assessment-dashboard'); // Or your assessment page
          }
        } catch (error) {
          console.error("Failed to check assessment status:", error);
          // Fallback to the main dashboard on error
          navigate('/dashboard');
        }
      };

      handleRedirect();
    }
  }, [isLoading, isAuthenticated, user, navigate]);

  // Display a loading indicator while the check is in progress.
  return (
    <Layout>
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1, textAlign: 'center' }}>
        <Box>
          <Typography variant="h5" gutterBottom>
            Finalizing login...
          </Typography>
          <CircularProgress />
        </Box>
      </Container>
    </Layout>
  );
};

export default AuthCallback;