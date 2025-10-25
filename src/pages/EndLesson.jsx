import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Paper, 
  Box, 
  Button, 
  Card,
  CardContent,
  LinearProgress,
  CircularProgress
} from '@mui/material';
import Layout from '../components/Layout';
import { useAuth0 } from '@auth0/auth0-react';
import UserService from '../services/userService';
import UserGraphService from '../services/userGraphService';

const EndLesson = () => {
  const navigate = useNavigate();
  const { user } = useAuth0();
  const [studentId, setStudentId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [closeConcepts, setCloseConcepts] = useState(null);
  const [graphLoading, setGraphLoading] = useState(false);
  const [graphError, setGraphError] = useState(null);
  const [learningObjective, setLearningObjective] = useState('');

  const handleReturnToDashboard = () => {
    navigate('/dashboard');
  };

  // Fetch student ID
  useEffect(() => {
    const fetchStudentId = async () => {
      if (user?.email) {
        try {
          const id = await UserService.getStudentId(user.email);
          setStudentId(id.student_id);
          setLoading(false);
        } catch (err) {
          console.error('Error fetching student ID:', err);
          setLoading(false);
        }
      }
    };
    
    fetchStudentId();
  }, [user]);

  // Fetch close concepts (progress data)
  useEffect(() => {
    const fetchCloseConcepts = async () => {
      if (!studentId) return;
      try {
        setGraphLoading(true);
        const graph = await UserGraphService.getCloseConcepts(studentId);
        setCloseConcepts(graph || {});
      } catch (e) {
        console.error('Error fetching close concepts:', e);
        setGraphError('Failed to load progress data.');
      } finally {
        setGraphLoading(false);
      }
    };
    fetchCloseConcepts();
  }, [studentId]);

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

          {/* Real Progress Chart */}
          <Paper sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ mb: 3, textAlign: 'center' }}>
              📊 Your Learning Progress
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, textAlign: 'center', color: 'text.secondary' }}>
              Top concepts based on your current graph
            </Typography>
            
            {/* Real Progress Data */}
            <Box sx={{ mt: 3 }}>
              {graphLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 120 }}>
                  <CircularProgress size={24} />
                </Box>
              ) : graphError ? (
                <Typography color="error" sx={{ textAlign: 'center' }}>{graphError}</Typography>
              ) : closeConcepts && Object.keys(closeConcepts).length > 0 ? (
                <Box>
                  {Object.entries(closeConcepts)
                    .slice(0, 10)
                    .map(([concept, value]) => {
                      const pct = Math.max(0, Math.min(100, Math.round(Number(value ?? 0) * 100)));
                      const isCurrentLearningObjective = learningObjective && concept.toLowerCase() === learningObjective.toLowerCase();
                      
                      return (
                        <Card key={concept} sx={{ mb: 2, boxShadow: 1 }}>
                          <CardContent sx={{ py: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                              <Typography 
                                variant="body1" 
                                sx={{ 
                                  fontWeight: 'medium',
                                  color: isCurrentLearningObjective ? '#9c27b0' : 'inherit',
                                  fontWeight: isCurrentLearningObjective ? 'bold' : 'medium'
                                }}
                              >
                                {isCurrentLearningObjective && '🎯 '}
                                {concept}
                              </Typography>
                              <Typography 
                                variant="body2" 
                                sx={{ 
                                  color: isCurrentLearningObjective ? '#9c27b0' : 'text.secondary',
                                  fontWeight: isCurrentLearningObjective ? 'bold' : 'normal'
                                }}
                              >
                                {pct}%
                              </Typography>
                            </Box>
                            <LinearProgress 
                              variant="determinate" 
                              value={pct}
                              sx={{ 
                                height: 8, 
                                borderRadius: 4,
                                backgroundColor: 'grey.200',
                                '& .MuiLinearProgress-bar': {
                                  borderRadius: 4,
                                  backgroundColor: isCurrentLearningObjective ? '#9c27b0' : undefined,
                                }
                              }}
                            />
                          </CardContent>
                        </Card>
                      );
                    })}
                </Box>
              ) : (
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                  <Typography color="text.secondary">
                    No progress data available yet. Complete more lessons to see your progress.
                  </Typography>
                </Box>
              )}
            </Box>
          </Paper>
        </Box>
      </Container>
    </Layout>
  );
};

export default EndLesson;
