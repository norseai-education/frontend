import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Typography, Container } from '@mui/material';
import Layout from '../components/Layout';
import { AssessmentAPI } from '../api/assessment'; // 1. Import the AssessmentAPI

/**
 * A mock function to check the user's assessment status.
 * Replace this with a real API call to your backend.
 * @param {string} userId - The unique identifier for the user (e.g., user.sub).
 * @returns {Promise<boolean>} - A promise that resolves to true if the assessment is complete.
 */
const checkAssessmentStatus = async (userId) => {
  console.log(`Checking assessment status for user: ${userId}`);
  try {
    // Attempt to fetch the assessment result for the user.
    await AssessmentAPI.getAssessmentResult(userId);
    // If the request succeeds, it means an assessment exists.
    return true;
  } catch (error) {
    // If the error is a 404, it means no assessment was found for the user.
    if (error.response && error.response.status === 404) {
      console.log(`No assessment found for user: ${userId}`);
      return false;
    }
    // For any other errors, log them and assume no assessment.
    console.error("An error occurred while checking assessment status:", error);
    return false;
  }
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
          // The user ID from Auth0 is in the `sub` property.
          // We will use a hardcoded UUID for now since the backend expects it.
          const mockUserId = '00000000-0000-0000-0000-000000000000'; // Replace with real mapping
          const hasCompletedAssessment = await checkAssessmentStatus(mockUserId);
          
          if (hasCompletedAssessment) {
            navigate('/dashboard');
          } else {
            navigate('/cs-assessment'); // Or your assessment page
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
