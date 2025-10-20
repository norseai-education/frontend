import * as React from 'react';
import { useState, useEffect } from 'react';
import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Button, 
  CircularProgress, 
  LinearProgress,
  Tooltip,
  Fade
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import AssessmentService from '../../services/assessmentService';
import ChatService from '../../services/chatService';
import UserService from '../../services/userService';
import UserGraphService from '../../services/userGraphService';
import classesService from '../../services/classesService';
import { keyframes } from '@mui/system';

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(76, 175, 80, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(76, 175, 80, 0);
  }
`;

const glow = keyframes`
  0%, 100% {
    filter: brightness(1) drop-shadow(0 0 5px currentColor);
  }
  50% {
    filter: brightness(1.2) drop-shadow(0 0 15px currentColor);
  }
`;

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
  const [learningObjective, setLearningObjective] = useState('');
  const [availableClasses, setAvailableClasses] = useState([]);
  const [myClasses, setMyClasses] = useState([]);
  const [classesLoading, setClassesLoading] = useState(false);
  const [classesError, setClassesError] = useState(null);
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
        const response = await UserGraphService.getUserGraph(studentId);
        const graph = response.user_graph;
        const learning_objective = response.learning_objective;
        console.log("learning_objective: ", learning_objective);
        console.log("graph: ", graph);
        setUserGraph(graph || {});
        setLearningObjective(learning_objective || '');
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

  // Fetch available classes
  useEffect(() => {
    const fetchAvailableClasses = async () => {
      try {
        setClassesLoading(true);
        const response = await classesService.getAvailableClasses();
        setAvailableClasses(response);
      } catch (error) {
        console.error('Error fetching available classes:', error);
        setClassesError('Failed to load available classes.');
      } finally {
        setClassesLoading(false);
      }
    };
    fetchAvailableClasses();
  }, []);

  // Fetch my classes
  useEffect(() => {
    const fetchMyClasses = async () => {
      if (!studentId) return;
      try {
        setClassesLoading(true);
        const response = await classesService.getMyClasses(studentId);
        setMyClasses(response);
      } catch (error) {
        console.error('Error fetching my classes:', error);
        setClassesError('Failed to load my classes.');
      } finally {
        setClassesLoading(false);
      }
    };
    fetchMyClasses();
  }, [studentId]);

  // Helper functions for gamified userGraph visualization
  const getMasteryColor = (value, concept) => {
    // Check if this concept matches the current learning objective
    if (learningObjective && concept.toLowerCase() === learningObjective.toLowerCase()) {
      return '#9c27b0'; // Purple - Current Learning Objective
    }
    
    // Regular mastery colors
    if (value >= 0.8) return '#4caf50'; // Green - Mastered
    if (value >= 0.6) return '#8bc34a'; // Light Green - Advanced
    if (value >= 0.4) return '#ffc107'; // Yellow - Intermediate
    if (value >= 0.2) return '#ff9800'; // Orange - Beginner
    if (value > 0) return '#f44336'; // Red - Novice (but has some progress)
    return '#9e9e9e'; // Grey - No progress yet
  };

  const getNodeSize = (value) => {
    // Much skinnier bars to fit more on screen without scrolling
    const baseSize = 4;
    const masteryBonus = Math.round(value * 2);
    return Math.max(baseSize, baseSize + masteryBonus);
  };

  const getNodeHeight = (value) => {
    // Height represents mastery level
    const minHeight = 20;
    const maxHeight = 120;
    return minHeight + (value * (maxHeight - minHeight));
  };

  const isNearComplete = (value) => value >= 0.7;

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

  const addClass = async (classId) => {
    if (!studentId) {
      console.error('Student ID not available');
      return;
    }

    try {
      await classesService.addClasses(studentId, classId);
      // Refresh my classes after adding
      const response = await classesService.getMyClasses(studentId);
      setMyClasses(response);
    } catch (error) {
      console.error('Error adding class:', error);
      setClassesError('Failed to add class. Please try again.');
    }
  };

  const removeClass = async (classId) => {
    if (!studentId) {
      console.error('Student ID not available');
      return;
    }

    try {
      await classesService.removeClass(studentId);
      // Refresh my classes after removing
      const response = await classesService.getMyClasses(studentId);
      setMyClasses(response);
    } catch (error) {
      console.error('Error removing class:', error);
      setClassesError('Failed to remove class. Please try again.');
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
        {/* AMC8 Start Lesson Card - Now at the top */}
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

        {/* Close Concepts Card - Detailed Progress */}
        <Grid item xs={12} md={6}>
          <Card sx={{ minWidth: 300, minHeight: 350, display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 2 }}>
              <Box sx={{ width: '100%' }}>
                <Typography variant="h5" component="div">
                  Progress
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
                          const isCurrentLearningObjective = learningObjective && concept.toLowerCase() === learningObjective.toLowerCase();
                          
                          return (
                            <Box key={concept} sx={{ mb: 1.5 }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                <Typography 
                                  variant="body2" 
                                  sx={{ 
                                    pr: 1, 
                                    overflow: 'hidden', 
                                    textOverflow: 'ellipsis', 
                                    whiteSpace: 'nowrap',
                                    color: isCurrentLearningObjective ? '#9c27b0' : 'inherit',
                                    fontWeight: isCurrentLearningObjective ? 'bold' : 'normal',
                                    position: 'relative'
                                  }} 
                                  title={concept}
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
                                  '& .MuiLinearProgress-bar': {
                                    backgroundColor: isCurrentLearningObjective ? '#9c27b0' : undefined,
                                  }
                                }}
                              />
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

        {/* Courses Area Card */}
        <Grid item xs={12} md={6}>
          <Card sx={{ minWidth: 300, minHeight: 350, display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
              <Box sx={{ width: '100%' }}>
                <Typography variant="h5" component="div">
                  Courses
                </Typography>
                <Typography sx={{ mt: 1 }} color="text.secondary">
                  Manage your classes and explore available courses
                </Typography>
                
                {classesLoading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 120, mt: 2 }}>
                    <CircularProgress size={24} />
                  </Box>
                ) : classesError ? (
                  <Typography color="error" sx={{ mt: 2 }}>{classesError}</Typography>
                ) : (
                  <Box sx={{ mt: 2 }}>
                    {/* My Classes Section */}
                    <Typography variant="h6" sx={{ mb: 1, color: 'primary.main' }}>
                      My Classes
                    </Typography>
                    {myClasses && myClasses.class_names && myClasses.class_names.length > 0 ? (
                      <Box sx={{ mb: 3 }}>
                        {myClasses.class_names.map((className, index) => (
                          <Box key={index} sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                            p: 1,
                            mb: 1,
                            backgroundColor: 'rgba(25, 118, 210, 0.1)',
                            borderRadius: 1,
                            border: '1px solid rgba(25, 118, 210, 0.2)'
                          }}>
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                {className}
                              </Typography>
                              {myClasses.class_descriptions && myClasses.class_descriptions[index] && (
                                <Typography variant="caption" color="text.secondary">
                                  {myClasses.class_descriptions[index]}
                                </Typography>
                              )}
                            </Box>
                            <Button
                              size="small"
                              color="error"
                              variant="outlined"
                              onClick={() => removeClass(myClasses.class_ids[index])}
                              sx={{ minWidth: 'auto', px: 1 }}
                            >
                              Remove
                            </Button>
                          </Box>
                        ))}
                      </Box>
                    ) : (
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, fontStyle: 'italic' }}>
                        No classes enrolled yet. Browse available classes below.
                      </Typography>
                    )}

                    {/* Available Classes Section */}
                    <Typography variant="h6" sx={{ mb: 1, color: 'primary.main' }}>
                      Available Classes
                    </Typography>
                    {availableClasses && availableClasses.class_names && availableClasses.class_names.length > 0 ? (
                      <Box sx={{ maxHeight: 200, overflowY: 'auto' }}>
                        {availableClasses.class_names.map((className, index) => {
                          const classId = availableClasses.class_ids[index];
                          const isEnrolled = myClasses && myClasses.class_ids && myClasses.class_ids.includes(classId);
                          
                          return (
                            <Box key={index} sx={{ 
                              display: 'flex', 
                              justifyContent: 'space-between', 
                              alignItems: 'center',
                              p: 1,
                              mb: 1,
                              backgroundColor: isEnrolled ? 'rgba(76, 175, 80, 0.1)' : 'rgba(158, 158, 158, 0.1)',
                              borderRadius: 1,
                              border: `1px solid ${isEnrolled ? 'rgba(76, 175, 80, 0.2)' : 'rgba(158, 158, 158, 0.2)'}`
                            }}>
                              <Box>
                                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                  {className}
                                </Typography>
                                {availableClasses.class_descriptions && availableClasses.class_descriptions[index] && (
                                  <Typography variant="caption" color="text.secondary">
                                    {availableClasses.class_descriptions[index]}
                                  </Typography>
                                )}
                              </Box>
                              <Button
                                size="small"
                                color={isEnrolled ? "success" : "primary"}
                                variant={isEnrolled ? "outlined" : "contained"}
                                onClick={() => !isEnrolled && addClass(classId)}
                                disabled={isEnrolled || !studentId}
                                sx={{ minWidth: 'auto', px: 1 }}
                              >
                                {isEnrolled ? 'Enrolled' : 'Add'}
                              </Button>
                            </Box>
                          );
                        })}
                      </Box>
                    ) : (
                      <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                        No available classes found.
                      </Typography>
                    )}
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Visual Knowledge Graph Card - Visual Overview */}
        <Grid item xs={12} md={6}>
          <Card sx={{ minWidth: 300, minHeight: 350, display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
              <Box sx={{ width: '100%' }}>
                <Typography variant="h5" component="div" sx={{ color: 'white', fontWeight: 'bold' }}>
                  Your Graph
                </Typography>
                <Typography sx={{ mt: 1, color: 'rgba(255,255,255,0.8)' }}>
                  Your learning journey across all concepts
                </Typography>
                
                <Box sx={{ mt: 2, height: 250, overflow: 'hidden', position: 'relative' }}>
                  {graphLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                      <CircularProgress sx={{ color: 'white' }} />
                    </Box>
                  ) : graphError ? (
                    <Typography color="error" sx={{ color: 'white', textAlign: 'center', mt: 4 }}>{graphError}</Typography>
                  ) : userGraph && Object.keys(userGraph).length > 0 ? (
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'end', 
                      height: '100%', 
                      gap: 0, // Remove gap to make bars touch
                      px: 1,
                      overflowX: 'hidden', // Remove scrolling to fit everything
                      flexWrap: 'nowrap',
                      justifyContent: 'flex-start',
                    }}>
                      {Object.entries(userGraph)
                        .sort((a, b) => b[1] - a[1]) // Sort by mastery level
                        .map(([concept, value], index) => {
                          const masteryValue = Math.max(0, Math.min(1, Number(value) || 0));
                          const nodeHeight = getNodeHeight(masteryValue);
                          const nodeSize = getNodeSize(masteryValue);
                          const nodeColor = getMasteryColor(masteryValue, concept);
                          const percentage = Math.round(masteryValue * 100);
                          const nearComplete = isNearComplete(masteryValue);
                          const isLearningObjective = learningObjective && concept.toLowerCase() === learningObjective.toLowerCase();
                          
                          return (
                            <Fade in={true} timeout={500 + index * 50} key={concept}>
                              <Tooltip 
                                title={
                                  <Box sx={{ textAlign: 'center' }}>
                                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'white' }}>
                                      {concept}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                                      {percentage}% Mastery
                                    </Typography>
                                    {isLearningObjective && (
                                      <Typography variant="body2" sx={{ color: '#9c27b0', fontWeight: 'bold', mt: 0.5 }}>
                                        Current Learning Objective
                                      </Typography>
                                    )}
                                  </Box>
                                }
                                arrow
                                placement="top"
                              >
                                <Box
                                  sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    minWidth: nodeSize, // Ensure consistent width
                                    '&:hover': {
                                      transform: 'scale(1.05)',
                                      zIndex: 10,
                                    }
                                  }}
                                >
                                  {/* Node/Bar */}
                                  <Box
                                    sx={{
                                      width: nodeSize,
                                      height: nodeHeight,
                                      backgroundColor: nodeColor,
                                      borderRadius: '2px 2px 0 0', // Smaller border radius for touching bars
                                      position: 'relative',
                                      transition: 'all 0.3s ease',
                                      boxShadow: isLearningObjective 
                                        ? '0 0 25px rgba(156, 39, 176, 0.8)' 
                                        : nearComplete 
                                          ? '0 0 20px rgba(76, 175, 80, 0.6)' 
                                          : '0 2px 8px rgba(0,0,0,0.3)',
                                      animation: isLearningObjective 
                                        ? `${glow} 1.5s ease-in-out infinite` 
                                        : nearComplete 
                                          ? `${glow} 2s ease-in-out infinite` 
                                          : 'none',
                                      '&::before': (isLearningObjective || nearComplete) ? {
                                        content: '""',
                                        position: 'absolute',
                                        top: -2,
                                        left: -2,
                                        right: -2,
                                        bottom: -2,
                                        borderRadius: '4px 4px 0 0',
                                        background: isLearningObjective 
                                          ? `linear-gradient(45deg, ${nodeColor}, transparent, ${nodeColor})`
                                          : `linear-gradient(45deg, ${nodeColor}, transparent, ${nodeColor})`,
                                        zIndex: -1,
                                        animation: isLearningObjective 
                                          ? `${pulse} 1.5s ease-in-out infinite` 
                                          : `${pulse} 2s ease-in-out infinite`,
                                      } : {},
                                      '&:hover': {
                                        boxShadow: `0 0 30px ${nodeColor}`,
                                        transform: 'scale(1.05)',
                                      }
                                    }}
                                  />
                                  
                                  {/* Ground Line */}
                                  <Box
                                    sx={{
                                      width: nodeSize,
                                      height: 1,
                                      backgroundColor: 'rgba(255,255,255,0.3)',
                                      borderRadius: 0.5,
                                    }}
                                  />
                                </Box>
                              </Tooltip>
                            </Fade>
                          );
                        })}
                    </Box>
                  ) : (
                    <Box sx={{ textAlign: 'center', mt: 4 }}>
                      <Typography sx={{ color: 'rgba(255,255,255,0.8)', mb: 2 }}>
                        No knowledge data yet. Start a lesson to build your graph.
                      </Typography>
                      <Button 
                        variant="contained" 
                        onClick={startLesson}
                        disabled={!studentId}
                        sx={{ 
                          backgroundColor: 'rgba(255,255,255,0.2)',
                          color: 'white',
                          '&:hover': {
                            backgroundColor: 'rgba(255,255,255,0.3)',
                          }
                        }}
                      >
                        Start Your Journey
                      </Button>
                    </Box>
                  )}
                </Box>
                
                {/* Legend */}
                {userGraph && Object.keys(userGraph).length > 0 && (
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                    {[
                      { color: '#9c27b0', label: 'Learning Objective' },
                      { color: '#4caf50', label: 'Mastered' },
                      { color: '#8bc34a', label: 'Advanced' },
                      { color: '#ffc107', label: 'Intermediate' },
                      { color: '#ff9800', label: 'Beginner' },
                      { color: '#f44336', label: 'Novice' },
                      { color: '#9e9e9e', label: 'No Progress' }
                    ].map((item) => (
                      <Box key={item.label} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Box sx={{ width: 12, height: 12, backgroundColor: item.color, borderRadius: 1 }} />
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '10px' }}>
                          {item.label}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardDisplay;
