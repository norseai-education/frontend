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
    <Box sx={{ backgroundColor: '#19192D', minHeight: '100vh' }}>
      {/* Progress Header */}
      <Paper elevation={2} sx={{ mb: 4, backgroundColor: '#bbdefb' }}>
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
            NorseAI Assessment
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <TimerIcon sx={{ color: '#1976d2' }} />
            <Typography sx={{ color: '#1976d2' }}>
              Question {currentQuestion + 1} of {assessment.problems.length}
            </Typography>
          </Box>
        </Box>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ height: 6 }}
        />
      </Paper>

      <Container maxWidth="md">
        <Card elevation={3} sx={{ mb: 4, backgroundColor: '#bbdefb' }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1976d2', mb: 2 }}>
              Question {currentQuestion + 1}
            </Typography>
            
            <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.6, fontSize: '1.1rem', color: '#000000' }}>
              <LatexRenderer>{parsedProblem.question}</LatexRenderer>
            </Typography>

            {/* Answer Choice Buttons */}
            <Box sx={{ width: '100%' }}>
              {['A', 'B', 'C', 'D', 'E'].map((letter) => (
                parsedProblem.choices[letter] && (
                  <Button
                    key={letter}
                    fullWidth
                    variant={selectedAnswer === letter ? "contained" : "outlined"}
                    onClick={() => handleAnswerChange(letter)}
                    sx={{
                      mb: 2,
                      p: 2,
                      justifyContent: 'flex-start',
                      textAlign: 'left',
                      textTransform: 'none',
                      fontSize: '1rem',
                      minHeight: '60px',
                      border: '2px solid',
                      borderColor: selectedAnswer === letter ? '#1976d2' : '#90caf9',
                      backgroundColor: selectedAnswer === letter ? '#1976d2' : '#e1f5fe',
                      color: selectedAnswer === letter ? 'white' : '#000000',
                      '&:hover': {
                        borderColor: '#1976d2',
                        backgroundColor: selectedAnswer === letter ? '#1565c0' : '#e1bee7',
                        color: selectedAnswer === letter ? 'white' : '#000000'
                      },
                      '& .MuiButton-startIcon': {
                        marginRight: 2,
                        fontSize: '1.2rem',
                        fontWeight: 'bold'
                      }
                    }}
                    startIcon={
                      <Box
                        sx={{
                          width: 32,
                          height: 32,
                          borderRadius: '50%',
                          backgroundColor: selectedAnswer === letter ? 'rgba(255,255,255,0.9)' : '#1976d2',
                          color: selectedAnswer === letter ? '#1976d2' : 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 'bold',
                          fontSize: '1rem'
                        }}
                      >
                        {letter}
                      </Box>
                    }
                  >
                    <LatexRenderer>{parsedProblem.choices[letter]}</LatexRenderer>
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
          px: 2
        }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            size="large"
            sx={{ 
              minWidth: 120,
              py: 1.5,
              px: 3,
              borderColor: '#1976d2',
              color: '#1976d2',
              '&:hover': {
                borderColor: '#1565c0',
                backgroundColor: '#e3f2fd'
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
                minWidth: 180,
                py: 1.5,
                px: 4,
                fontSize: '1.1rem',
                backgroundColor: '#1976d2',
                '&:hover': {
                  backgroundColor: '#1565c0'
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
                minWidth: 120,
                py: 1.5,
                px: 3,
                backgroundColor: '#1976d2',
                '&:hover': {
                  backgroundColor: '#1565c0'
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