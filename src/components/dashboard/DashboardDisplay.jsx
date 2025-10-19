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
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  Fade,
  Tooltip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import AssessmentService from '../../services/assessmentService';
import ChatService from '../../services/chatService';
import UserService from '../../services/userService';
import UserGraphService from '../../services/userGraphService';
import SearchIcon from '@mui/icons-material/Search';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { keyframes } from '@mui/system';

const shimmer = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
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
  const [sortBy, setSortBy] = useState('value'); // 'value', 'name', 'alphabetical'
  const [searchTerm, setSearchTerm] = useState('');
  const [displayLimit, setDisplayLimit] = useState(20);

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

  // Process and sort knowledge graph data
  const getProcessedGraphData = () => {
    if (!userGraph || Object.keys(userGraph).length === 0) return [];
    
    let processedData = Object.entries(userGraph)
      .filter(([concept, value]) => 
        concept.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map(([concept, value]) => ({
        concept,
        value: Math.max(0, Math.min(1, Number(value) || 0)),
        percentage: Math.round((Number(value) || 0) * 100)
      }));

    // Sort data
    switch (sortBy) {
      case 'value':
        processedData.sort((a, b) => b.value - a.value);
        break;
      case 'name':
        processedData.sort((a, b) => a.concept.localeCompare(b.concept));
        break;
      case 'alphabetical':
        processedData.sort((a, b) => a.concept.localeCompare(b.concept));
        break;
      default:
        processedData.sort((a, b) => b.value - a.value);
    }

    return processedData.slice(0, displayLimit);
  };

  const getProgressColor = (value) => {
    if (value >= 0.8) return '#4caf50'; // Green
    if (value >= 0.6) return '#8bc34a'; // Light Green
    if (value >= 0.4) return '#ff9800'; // Orange
    if (value >= 0.2) return '#ff5722'; // Deep Orange
    return '#f44336'; // Red
  };

  const getProgressGradient = (value) => {
    const color = getProgressColor(value);
    return `linear-gradient(90deg, ${color} 0%, ${color}dd 100%)`;
  };

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
          <Card sx={{ minWidth: 300, minHeight: 500, display: 'flex', flexDirection: 'column', boxShadow: 3 }}>
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
              {/* Header */}
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <TrendingUpIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                    Knowledge Graph
                  </Typography>
                </Box>
                <Typography sx={{ color: 'text.secondary' }}>
                  Your mastery across {userGraph ? Object.keys(userGraph).length : 0} concepts
                </Typography>
              </Box>

              {/* Controls */}
              {userGraph && Object.keys(userGraph).length > 0 && (
                <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
                  <TextField
                    size="small"
                    placeholder="Search concepts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ minWidth: 200 }}
                  />
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel>Sort by</InputLabel>
                    <Select
                      value={sortBy}
                      label="Sort by"
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <MenuItem value="value">Mastery Level</MenuItem>
                      <MenuItem value="name">Name</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl size="small" sx={{ minWidth: 100 }}>
                    <InputLabel>Show</InputLabel>
                    <Select
                      value={displayLimit}
                      label="Show"
                      onChange={(e) => setDisplayLimit(e.target.value)}
                    >
                      <MenuItem value={10}>10</MenuItem>
                      <MenuItem value={20}>20</MenuItem>
                      <MenuItem value={50}>50</MenuItem>
                      <MenuItem value={100}>All</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              )}

              {/* Graph Visualization */}
              <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
                {graphLoading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
                    <CircularProgress size={40} />
                  </Box>
                ) : graphError ? (
                  <Typography color="error" sx={{ textAlign: 'center', mt: 4 }}>{graphError}</Typography>
                ) : userGraph && Object.keys(userGraph).length > 0 ? (
                  <Box>
                    {getProcessedGraphData().map((item, index) => (
                      <Fade in={true} timeout={300 + index * 50} key={item.concept}>
                        <Box sx={{ mb: 2 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                            <Tooltip title={item.concept} arrow>
                              <Typography 
                                variant="body2" 
                                sx={{ 
                                  fontWeight: 'medium',
                                  overflow: 'hidden', 
                                  textOverflow: 'ellipsis', 
                                  whiteSpace: 'nowrap',
                                  maxWidth: '60%'
                                }}
                              >
                                {item.concept}
                              </Typography>
                            </Tooltip>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Chip 
                                label={`${item.percentage}%`} 
                                size="small" 
                                sx={{ 
                                  backgroundColor: getProgressColor(item.value),
                                  color: 'white',
                                  fontWeight: 'bold',
                                  minWidth: 50
                                }} 
                              />
                            </Box>
                          </Box>
                          <Box sx={{ 
                            position: 'relative',
                            height: 12,
                            backgroundColor: 'grey.200',
                            borderRadius: 6,
                            overflow: 'hidden',
                            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
                          }}>
                            <Box
                              sx={{
                                height: '100%',
                                width: `${item.percentage}%`,
                                background: getProgressGradient(item.value),
                                borderRadius: 6,
                                transition: 'width 0.8s ease-in-out',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                                position: 'relative',
                                '&::after': {
                                  content: '""',
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  right: 0,
                                  bottom: 0,
                                  background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                                  animation: `${shimmer} 2s infinite`,
                                }
                              }}
                            />
                          </Box>
                        </Box>
                      </Fade>
                    ))}
                    {getProcessedGraphData().length === 0 && searchTerm && (
                      <Typography color="text.secondary" sx={{ textAlign: 'center', mt: 4 }}>
                        No concepts found matching "{searchTerm}"
                      </Typography>
                    )}
                  </Box>
                ) : (
                  <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Typography color="text.secondary" sx={{ mb: 2 }}>
                      No knowledge data yet. Start a lesson to build your graph.
                    </Typography>
                    <Button 
                      variant="outlined" 
                      onClick={startLesson}
                      disabled={!studentId}
                    >
                      Start Your First Lesson
                    </Button>
                  </Box>
                )}
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
