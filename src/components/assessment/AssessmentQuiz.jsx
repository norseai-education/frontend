import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Alert,
  LinearProgress,
  Paper,
  Fade,
  useTheme
} from '@mui/material';
import { 
  ArrowBack, 
  ArrowForward, 
  Send as SendIcon,
  Timer as TimerIcon 
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import AssessmentService from '../../services/assessmentService';
import ChatService from '../../services/chatService';
import UserService from '../../services/userService';
import LatexRenderer from '../common/LatexRenderer';

const AssessmentQuiz = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user } = useAuth0();

  // User state
  const [studentId, setStudentId] = useState(null);

  // Assessment state
  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Quiz state
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [timeSpent, setTimeSpent] = useState([]);
  const [startTime, setStartTime] = useState(Date.now());
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());

  // Parse problem text to display as-is with simple answer choices
  const parseProblemText = (problemText) => {
    return {
      question: problemText,
      choices: {
        'A': 'A',
        'B': 'B', 
        'C': 'C',
        'D': 'D',
        'E': 'E'
      }
    };
  };

  // Submission state
  const [submitting, setSubmitting] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [results, setResults] = useState(null);
  const [userGraph, setUserGraph] = useState(null);

  useEffect(() => {
    const fetchStudentId = async () => {
      if (user?.email) {
        try {
          const id = await UserService.getStudentId(user.email);
          setStudentId(id);
        } catch (err) {
          console.error('Error fetching student ID:', err);
          setError('Failed to load user information.');
        }
      }
    };
    
    fetchStudentId();
  }, [user]);

  useEffect(() => {
    if (studentId) {
      loadAssessment();
    }
  }, [studentId]);

  useEffect(() => {
    // Track time spent on each question
    setQuestionStartTime(Date.now());
  }, [currentQuestion]);

  const loadAssessment = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await AssessmentService.getAssessment();
      console.log(data);
      setAssessment(data);
      
      // Initialize answers and time tracking arrays
      setAnswers(new Array(data.problems.length).fill(''));
      setTimeSpent(new Array(data.problems.length).fill(0));
      setStartTime(Date.now());
      setQuestionStartTime(Date.now());
    } catch (err) {
      console.error('Error loading assessment:', err);
      setError('Failed to load assessment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const recordTimeSpent = () => {
    const timeOnQuestion = (Date.now() - questionStartTime) / 1000;
    const newTimeSpent = [...timeSpent];
    newTimeSpent[currentQuestion] += timeOnQuestion;
    setTimeSpent(newTimeSpent);
  };

  const handleAnswerChange = (answerLetter) => {
    setSelectedAnswer(answerLetter);
    
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerLetter;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    recordTimeSpent();
    if (currentQuestion < assessment.problems.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(answers[currentQuestion + 1] || '');
    }
  };

  const handlePrevious = () => {
    recordTimeSpent();
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1] || '');
    }
  };

  const handleSubmit = async () => {
    recordTimeSpent();
    setSubmitting(true);
    
    try {
      // Prepare student answers in the expected format
      const studentAnswers = assessment.problems.map((problem, index) => ({
        problem_id: problem.problem_id,
        student_answer: answers[index],
        time_spent_seconds: timeSpent[index]
      }));

      console.log(studentAnswers);

      // Store the assessment
      const storeResult = await AssessmentService.storeAssessment(studentId, studentAnswers);

      console.log(storeResult);
      
      // Submit for evaluation
      const submitAnswers = studentAnswers.map(({ problem_id, student_answer }) => ({
        problem_id,
        student_answer
      }));

      console.log(submitAnswers);

      const evaluation = await AssessmentService.submitAssessment(submitAnswers);
      
      console.log(evaluation);
      
      // Update knowledge graph
      const userGraphData = await AssessmentService.updateKnowledgeGraph(storeResult.assessmentId);
      console.log(userGraphData);
      setUserGraph(userGraphData);

      setResults({
        solutions: evaluation.solutions,
        totalCorrect: evaluation.totalCorrect,
        totalQuestions: assessment.problems.length,
        percentage: (evaluation.totalCorrect / assessment.problems.length) * 100
      });
      
      setCompleted(true);
    } catch (err) {
      console.error('Error submitting assessment:', err);
      setError('Failed to submit assessment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleContinue = async () => {
    try {
      // Initialize chat session and redirect
      await ChatService.initializeSession(studentId, userGraph.userGraph);
      navigate('/chat');
    } catch (err) {
      console.error('Error initializing chat:', err);
      setError('Failed to start lesson. Please try again.');
    }
  };

  // Loading state
  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 8, textAlign: 'center' }}>
        <CircularProgress size={60} />
        <Typography sx={{ mt: 2 }}>Loading Assessment...</Typography>
      </Container>
    );
  }

  // Error state
  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error" action={
          <Button color="inherit" size="small" onClick={loadAssessment}>
            Retry
          </Button>
        }>
          {error}
        </Alert>
      </Container>
    );
  }

  // Results state
  if (completed && results) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Fade in={true}>
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom color="primary">
              Assessment Complete!
            </Typography>
            
            <Box sx={{ my: 4 }}>
              <Typography variant="h2" sx={{ 
                color: results.percentage >= 70 ? 'success.main' : 
                       results.percentage >= 50 ? 'warning.main' : 'error.main',
                fontWeight: 'bold' 
              }}>
                {results.percentage.toFixed(1)}%
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {results.totalCorrect} out of {results.totalQuestions} correct
              </Typography>
            </Box>

            <LinearProgress
              variant="determinate"
              value={results.percentage}
              sx={{
                height: 10,
                borderRadius: 5,
                mb: 4,
                '& .MuiLinearProgress-bar': {
                  backgroundColor: results.percentage >= 70 ? theme.palette.success.main :
                                  results.percentage >= 50 ? theme.palette.warning.main :
                                  theme.palette.error.main
                }
              }}
            />

            <Typography variant="body1" sx={{ mb: 3 }}>
              Great job! Based on your results, we'll customize your learning experience.
            </Typography>

            <Button
              variant="contained"
              size="large"
              onClick={handleContinue}
              sx={{ px: 4, py: 1.5 }}
            >
              Start Learning Journey
            </Button>
          </Paper>
        </Fade>
      </Container>
    );
  }

  // Quiz interface
  if (!assessment) return null;

  const currentProblem = assessment.problems[currentQuestion];
  const parsedProblem = parseProblemText(currentProblem.display_problem);
  const progress = ((currentQuestion + 1) / assessment.problems.length) * 100;
  const isLastQuestion = currentQuestion === assessment.problems.length - 1;
  const hasSelectedAnswer = selectedAnswer !== '';

  return (
    <Box sx={{ 
      backgroundColor: '#19192D', 
      minHeight: '100vh',
      '& @keyframes pulse': {
        '0%': {
          opacity: 1,
          transform: 'scale(1)'
        },
        '50%': {
          opacity: 0.5,
          transform: 'scale(1.1)'
        },
        '100%': {
          opacity: 1,
          transform: 'scale(1)'
        }
      }
    }}>
      {/* Progress Header */}
      <Paper elevation={4} sx={{ 
        mb: 4, 
        backgroundColor: '#bbdefb',
        borderRadius: '0 0 16px 16px',
        border: '1px solid rgba(25, 118, 210, 0.1)',
        boxShadow: '0 4px 20px rgba(25, 118, 210, 0.1)'
      }}>
        <Box sx={{ 
          p: { xs: 2, sm: 3 }, 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2
        }}>
          <Typography variant="h6" sx={{ 
            fontWeight: 'bold', 
            color: '#1976d2',
            fontSize: { xs: '1.1rem', sm: '1.3rem' },
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}>
            <Box sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: '#1976d2',
              animation: 'pulse 2s infinite'
            }} />
            NorseAI Assessment
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            px: 2,
            py: 1,
            borderRadius: '20px',
            border: '1px solid rgba(25, 118, 210, 0.2)'
          }}>
            <TimerIcon sx={{ color: '#1976d2', fontSize: '1.2rem' }} />
            <Typography sx={{ 
              color: '#1976d2',
              fontWeight: '600',
              fontSize: { xs: '0.9rem', sm: '1rem' }
            }}>
              Question {currentQuestion + 1} of {assessment.problems.length}
            </Typography>
          </Box>
        </Box>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ 
            height: 8,
            borderRadius: '0 0 16px 16px',
            '& .MuiLinearProgress-bar': {
              borderRadius: '0 0 16px 16px',
              background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)'
            }
          }}
        />
      </Paper>

      <Container maxWidth="md">
        <Card elevation={6} sx={{ 
          mb: 4, 
          backgroundColor: '#bbdefb',
          borderRadius: '16px',
          border: '1px solid rgba(25, 118, 210, 0.1)',
          boxShadow: '0 8px 32px rgba(25, 118, 210, 0.15)',
          backdropFilter: 'blur(10px)'
        }}>
          <CardContent sx={{ p: { xs: 3, sm: 4, md: 5 } }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mb: 3,
              pb: 2,
              borderBottom: '2px solid rgba(25, 118, 210, 0.1)'
            }}>
              <Box sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                backgroundColor: '#1976d2',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '1.2rem',
                mr: 2,
                boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)'
              }}>
                {currentQuestion + 1}
              </Box>
              <Typography variant="h5" sx={{ 
                fontWeight: 'bold', 
                color: '#1976d2',
                fontSize: { xs: '1.3rem', sm: '1.5rem' }
              }}>
                Question {currentQuestion + 1}
              </Typography>
            </Box>
            
            <Typography variant="body1" sx={{ 
              mb: 4, 
              lineHeight: 1.7, 
              fontSize: { xs: '1rem', sm: '1.1rem' }, 
              color: '#000000',
              fontWeight: '400',
              textAlign: 'justify'
            }}>
              <LatexRenderer>{parsedProblem.question}</LatexRenderer>
            </Typography>

            {/* Answer Choice Buttons - Horizontal Layout */}
            <Box sx={{ 
              width: '100%',
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 2, sm: 1.5 },
              justifyContent: 'center',
              alignItems: 'stretch',
              flexWrap: 'wrap'
            }}>
              {['A', 'B', 'C', 'D', 'E'].map((letter) => (
                parsedProblem.choices[letter] && (
                  <Button
                    key={letter}
                    variant={selectedAnswer === letter ? "contained" : "outlined"}
                    onClick={() => handleAnswerChange(letter)}
                    sx={{
                      flex: { xs: '1 1 100%', sm: '1 1 0' },
                      minWidth: { xs: '100%', sm: '120px', md: '140px' },
                      maxWidth: { xs: '100%', sm: '180px' },
                      p: { xs: 2, sm: 1.5 },
                      minHeight: { xs: '60px', sm: '80px' },
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      textTransform: 'none',
                      fontSize: { xs: '1rem', sm: '0.9rem' },
                      fontWeight: '500',
                      border: '2px solid',
                      borderColor: selectedAnswer === letter ? '#1976d2' : '#90caf9',
                      backgroundColor: selectedAnswer === letter ? '#1976d2' : '#e1f5fe',
                      color: selectedAnswer === letter ? 'white' : '#000000',
                      borderRadius: '12px',
                      boxShadow: selectedAnswer === letter 
                        ? '0 4px 12px rgba(25, 118, 210, 0.3)' 
                        : '0 2px 8px rgba(0, 0, 0, 0.1)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        borderColor: '#1976d2',
                        backgroundColor: selectedAnswer === letter ? '#1565c0' : '#e1bee7',
                        color: selectedAnswer === letter ? 'white' : '#000000',
                        transform: 'translateY(-2px)',
                        boxShadow: selectedAnswer === letter 
                          ? '0 6px 16px rgba(25, 118, 210, 0.4)' 
                          : '0 4px 12px rgba(0, 0, 0, 0.15)'
                      },
                      '&:active': {
                        transform: 'translateY(0px)'
                      }
                    }}
                  >
                    {/* Letter Badge */}
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        backgroundColor: selectedAnswer === letter ? 'rgba(255,255,255,0.9)' : '#1976d2',
                        color: selectedAnswer === letter ? '#1976d2' : 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        fontSize: '1.1rem',
                        mb: 1,
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                      }}
                    >
                      {letter}
                    </Box>
                    
                    {/* Answer Text */}
                    <Box sx={{ 
                      fontSize: { xs: '0.9rem', sm: '0.8rem' },
                      fontWeight: '500',
                      lineHeight: 1.2,
                      textAlign: 'center'
                    }}>
                      <LatexRenderer>{parsedProblem.choices[letter]}</LatexRenderer>
                    </Box>
                  </Button>
                )
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* Navigation */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mt: 4,
          mb: 4,
          px: 2,
          gap: 2
        }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            size="large"
            sx={{ 
              minWidth: { xs: 100, sm: 120 },
              py: 1.5,
              px: 3,
              borderColor: '#1976d2',
              color: '#1976d2',
              borderRadius: '12px',
              fontWeight: '600',
              fontSize: '1rem',
              borderWidth: '2px',
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: '#1565c0',
                backgroundColor: '#e3f2fd',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(25, 118, 210, 0.2)'
              },
              '&:disabled': {
                borderColor: '#90caf9',
                color: '#90caf9',
                backgroundColor: 'transparent'
              }
            }}
          >
            Previous
          </Button>

          {isLastQuestion ? (
            <Button
              variant="contained"
              endIcon={submitting ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
              onClick={handleSubmit}
              disabled={currentQuestion !== assessment.problems.length - 1}
              size="large"
              sx={{ 
                minWidth: { xs: 160, sm: 180 },
                py: 1.5,
                px: 4,
                fontSize: '1.1rem',
                fontWeight: '600',
                backgroundColor: '#1976d2',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#1565c0',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 16px rgba(25, 118, 210, 0.4)'
                },
                '&:disabled': {
                  backgroundColor: '#90caf9',
                  color: 'white'
                }
              }}
            >
              {submitting ? 'Submitting...' : 'Submit Assessment'}
            </Button>
          ) : (
            <Button
              variant="contained"
              endIcon={<ArrowForward />}
              onClick={handleNext}
              size="large"
              sx={{ 
                minWidth: { xs: 100, sm: 120 },
                py: 1.5,
                px: 3,
                backgroundColor: '#1976d2',
                borderRadius: '12px',
                fontWeight: '600',
                fontSize: '1rem',
                boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#1565c0',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 16px rgba(25, 118, 210, 0.4)'
                }
              }}
            >
              Next
            </Button>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default AssessmentQuiz;