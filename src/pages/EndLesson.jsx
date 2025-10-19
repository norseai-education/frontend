import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Paper, 
  Box, 
  Button, 
  Card,
  CardContent,
  LinearProgress
} from '@mui/material';
import Layout from '../components/Layout';

const EndLesson = () => {
  const navigate = useNavigate();

  const handleReturnToDashboard = () => {
    navigate('/dashboard');
  };

  // Placeholder data for the knowledge graph visualization
  const knowledgeData = [
    { topic: 'Vocabulary', progress: 85 },
    { topic: 'Grammar', progress: 72 },
    { topic: 'Conversation', progress: 90 },
    { topic: 'Pronunciation', progress: 68 },
    { topic: 'Reading', progress: 78 }
  ];

  return (
    <Layout>
      <Container maxWidth="md">
        <Box sx={{ mt: 4, mb: 4 }}>
          {/* Lesson Complete Message */}
          <Paper sx={{ p: 4, textAlign: 'center', mb: 4 }}>
            <Typography variant="h3" gutterBottom sx={{ color: 'success.main', fontWeight: 'bold' }}>
              🎉 Lesson Complete!
            </Typography>
            <Typography variant="h6" sx={{ color: 'text.secondary', mb: 3 }}>
              Great job! You've successfully completed your lesson.
            </Typography>
            
            {/* Return to Dashboard Button */}
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleReturnToDashboard}
              sx={{ 
                px: 4, 
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 'bold'
              }}
            >
              Return to Dashboard
            </Button>
          </Paper>

          {/* Knowledge Graph Visualization Placeholder */}
          <Paper sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ mb: 3, textAlign: 'center' }}>
              📊 Your Learning Progress
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, textAlign: 'center', color: 'text.secondary' }}>
              Knowledge Graph Visualization (Coming Soon)
            </Typography>
            
            {/* Placeholder Bar Graph */}
            <Box sx={{ mt: 3 }}>
              {knowledgeData.map((item, index) => (
                <Card key={index} sx={{ mb: 2, boxShadow: 1 }}>
                  <CardContent sx={{ py: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                        {item.topic}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {item.progress}%
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={item.progress} 
                      sx={{ 
                        height: 8, 
                        borderRadius: 4,
                        backgroundColor: 'grey.200',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 4,
                        }
                      }}
                    />
                  </CardContent>
                </Card>
              ))}
            </Box>
            
            {/* Placeholder note */}
            <Box sx={{ mt: 3, p: 2, backgroundColor: 'grey.50', borderRadius: 2 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
                This will be replaced with an interactive knowledge graph showing your learning journey and concept mastery.
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Layout>
  );
};

export default EndLesson;
