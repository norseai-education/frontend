import * as React from 'react';
import { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Box, Button, CircularProgress, LinearProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import AssessmentService from '../../services/assessmentService';
import ChatService from '../../services/chatService';
import UserService from '../../services/userService';
import UserGraphService from '../../services/userGraphService';

const cardData = [
  { title: 'AMC 8', content: 'View and manage student assessments.', button: 'Start Lesson' }];

const DashboardDisplay = () => {
  const navigate = useNavigate();
  const { user } = useAuth0();
  const [studentId, setStudentId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userGraph, setUserGraph] = useState(null);
  const [closeConcepts, setCloseConcepts] = useState(null);
  const [graphLoading, setGraphLoading] = useState(false);
  const [graphError, setGraphError] = useState(null);

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

  useEffect(() => {
    const fetchGraph = async () => {
      if (!studentId) return;
      try {
        setGraphLoading(true);
        const graph = await UserGraphService.getUserGraph(studentId);
        setUserGraph(graph || {});
      } catch (e) {
        console.error('Error fetching user graph:', e);
        setGraphError('Failed to load knowledge graph.');
      } finally {
        setGraphLoading(false);
      }
    };
    fetchGraph();
  }, [studentId]);

  useEffect(() => {
    const fetchCloseConcepts = async () => {
      if (!studentId) return;
      try {
        setGraphLoading(true);
        const graph = await UserGraphService.getCloseConcepts(studentId);
        setCloseConcepts(graph || {});
      } catch (e) {
        console.error('Error fetching close concepts:', e);
        setGraphError('Failed to load close concepts.');
      } finally {
        setGraphLoading(false);
      }
    };
    fetchCloseConcepts();
  }, [studentId]);

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
        {/* Knowledge Graph Card */}
        <Grid item xs={12} md={8}>
          <Card sx={{ minWidth: 300, minHeight: 350, display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 2 }}>
              <Box sx={{ width: '100%' }}>
                <Typography variant="h5" component="div">
                  Your Knowledge Progress
                </Typography>
                <Typography sx={{ mt: 1 }} color="text.secondary">
                  Top concepts based on your current graph
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {graphLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 120 }}>
                      <CircularProgress size={24} />
                    </Box>
                  ) : graphError ? (
                    <Typography color="error">{graphError}</Typography>
                  ) : closeConcepts && Object.keys(closeConcepts).length > 0 ? (
                    <Box>
                      {Object.entries(closeConcepts)
                        .sort((a, b) => (b[1] ?? 0) - (a[1] ?? 0))
                        .slice(0, 10)
                        .map(([concept, value]) => {
                          const pct = Math.max(0, Math.min(100, Math.round(Number(value ?? 0) * 100)));
                          return (
                            <Box key={concept} sx={{ mb: 1.5 }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                <Typography variant="body2" sx={{ pr: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={concept}>
                                  {concept}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {pct}%
                                </Typography>
                              </Box>
                              <LinearProgress variant="determinate" value={pct} />
                            </Box>
                          );
                        })}
                    </Box>
                  ) : (
                    <Typography color="text.secondary">No knowledge data yet. Start a lesson to build your graph.</Typography>
                  )}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
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
