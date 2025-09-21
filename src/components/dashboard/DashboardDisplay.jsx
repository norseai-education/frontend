import * as React from 'react';
import { Grid, Card, CardContent, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AssessmentService from '../../services/assessmentService';
import ChatService from '../../services/chatService';

const cardData = [
  { title: 'AMC 8', content: 'View and manage student assessments.', button: 'Start Lesson' },
  { title: 'CS Assessments', content: 'Manage user accounts and roles.', path: '/cs-assessment', button: 'Start Lesson' },
  { title: 'Analytics Assessments', content: 'Visualize platform usage and statistics.', path: '/analytics-assessment', button: 'Start Lesson' },
  { title: 'Geometry Assessments', content: 'Create and edit educational content.', path: '/geometry-assessment', button: 'Start Lesson' },
  { title: 'Machine Assessments', content: 'Configure application settings.', path: '/machine-learning-assessment', button: 'Start Lesson' },
  { title: 'Deep Learning Assessments', content: 'Generate and view reports.', path: '/deep-learning-assessment', button: 'Start Lesson' },
  { title: 'Chat', content: 'Monitor and manage chat interactions.', path: '/chat', button: 'Start Lesson' },
  { title: 'System Health', content: 'Check the status of system services.', path: '/admin', button: 'Start Lesson' },
];

const DashboardDisplay = () => {
  const navigate = useNavigate();

  // const handleButtonClick = (path) => {
  //   navigate(path);
  // };

  const startLesson = async () => {

    try {
      // Check if student needs assessment
      const checkResult = await AssessmentService.checkNeedAssessment(user.studentId);
      console.log(checkResult);
      console.log(user.studentId);
      
      if (checkResult.give_assessment) {
        // New student needs assessment
        navigate('/assessment');
      } else {
        // Existing student, initialize chat session
        try {
          const init = await ChatService.initializeSession(user.studentId);
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
