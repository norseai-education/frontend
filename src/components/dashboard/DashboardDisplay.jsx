import * as React from 'react';
import { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Box, Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import AssessmentService from '../../services/assessmentService';
import ChatService from '../../services/chatService';
import UserService from '../../services/userService';

const cardData = [
  { title: 'AMC 8', content: 'View and manage student assessments.', button: 'Start Lesson' }];

const DashboardDisplay = () => {
  const navigate = useNavigate();
  const { user } = useAuth0();
  const [studentId, setStudentId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentId = async () => {
      if (user?.email) {
        try {
          const id = await UserService.getStudentId(user.email);
          // console.log("stuid endpoint: ", id);
          setStudentId(id.student_id);
          setLoading(false);
        } catch (err) {
          console.error('Error fetching student ID:', err);
          setError('Failed to load user information.');
          setLoading(false);
        }
      }
    };
    
    fetchStudentId();
  }, [user]);

  const startLesson = async () => {
    if (!studentId) {
      console.error('Student ID not available');
      return;
    }

    try {
      // Check if student needs assessment
      console.log("studentId: ", studentId);
      const checkResult = await AssessmentService.checkNeedAssessment(studentId);
      console.log(checkResult);
      console.log(studentId);
      
      if (checkResult.give_assessment) {
        // New student needs assessment
        navigate('/assessment');
      } else {
        // Existing student, initialize chat session
        try {
          const init = await ChatService.initializeSession(studentId);
          console.log(init);
          navigate('/chat');
        } catch (chatError) {
          console.error('Failed to initialize chat session:', chatError);
          setError('Failed to start lesson. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error checking assessment:', error);
    }
  };

  if (loading) {
    return (
      <Box sx={{ flexGrow: 1, p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 300 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={4}>
        {cardData.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ minWidth: 300, height: 350, display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 2 }}>
                <Box>
                  <Typography variant="h5" component="div">
                    {card.title}
                  </Typography>
                  <Typography sx={{ mt: 1.5 }} color="text.secondary">
                    {card.content}
                  </Typography>
                </Box>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={startLesson}
                  disabled={!studentId}
                  sx={{ mt: 2, alignSelf: 'flex-start' }}
                >
                  {card.button}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DashboardDisplay;
