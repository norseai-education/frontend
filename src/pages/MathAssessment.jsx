import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Button, Box, Typography, Container, Paper, Stack, Divider } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const MathAssessment = () => {
  // State to track if the assessment is complete. Defaults to false.
  const [isAssessmentComplete, setIsAssessmentComplete] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function

  /**
   * This function simulates the completion of the assessment.
   * In a real application, you would call this after the user submits their
   * answers and you get a successful response from your backend.
   */
  const handleCompleteAssessment = () => {
    console.log("Assessment has been marked as complete.");
    setIsAssessmentComplete(true);
  };

  /**
   * Navigates the user to the chat introduction page.
   */
  const handleStartLearning = () => {
    navigate('/chat'); // Navigate to the route for ChatIntroduction
  };

  return (
    <Layout>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Math 101 Assessment
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {isAssessmentComplete
              ? 'Great job! The assessment is complete.'
              : 'Please complete the assessment to unlock the learning module.'}
          </Typography>

          <Stack spacing={2} direction="column">
            {/* This button is for demonstration to simulate completing the assessment */}
            <Button
              variant="contained"
              onClick={handleCompleteAssessment}
              disabled={isAssessmentComplete}
            >
              Complete Assessment (Simulated)
            </Button>

            <Divider>Start Learning</Divider>

            {/* This button is disabled until the assessment is complete */}
            <Button
              variant="contained"
              color="secondary"
              disabled={!isAssessmentComplete}
              onClick={handleStartLearning} // Add the onClick handler here
            >
              With Prof Norse AI
            </Button>

            <Button component={Link} to="/dashboard" sx={{ mt: 2 }}>
              Back to Dashboard
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Layout>
  );
};

export default MathAssessment;
