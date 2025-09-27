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
import AssessmentService from '../../services/assessmentService';
import ChatService from '../../services/chatService';
import { useAuth } from '../../contexts/AuthContext';

const AssessmentQuiz = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user } = useAuth();

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

  // Parse problem text to extract question and answer choices
  const parseProblemText = (problemText) => {
    // Common patterns for multiple choice questions in LaTeX
    // Pattern 1: (A) text (B) text (C) text (D) text (E) text
    // Pattern 2: A. text B. text C. text D. text E. text
    // Pattern 3: A) text B) text C) text D) text E) text
    
    const patterns = [
      /\(([A-E])\)\s*([^()]+?)(?=\([A-E]\)|\s*$)/g,
      /([A-E])\.?\s+([^A-E]+?)(?=[A-E]\.|\s*$)/g,
      /([A-E])\)\s*([^)]+?)(?=[A-E]\)|\s*$)/g
    ];

    let matches = [];
    let questionText = problemText;
    
    // Try each pattern
    for (const pattern of patterns) {
      const tempMatches = [...problemText.matchAll(pattern)];
      if (tempMatches.length >= 4) { // Should have at least A, B, C, D
        matches = tempMatches;
        
        // Extract question text (everything before first choice)
        const firstMatch = matches[0];
        const firstIndex = problemText.indexOf(firstMatch[0]);
        questionText = problemText.substring(0, firstIndex).trim();
        break;
      }
    }

    // If no pattern matched, try to split the text more generically
    if (matches.length < 4) {
      // Look for patterns with choice letters
      const choiceRegex = /([A-E])[.)]\s*(.+?)(?=\s*[A-E][.)]|\s*$)/g;
      matches = [...problemText.matchAll(choiceRegex)];
      
      if (matches.length >= 4) {
        const firstMatch = matches[0];
        const firstIndex = problemText.indexOf(firstMatch[0]);
        questionText = problemText.substring(0, firstIndex).trim();
      }
    }

    // Create choices object
    const choices = {};
    matches.forEach(match => {
      const letter = match[1];
      const text = match[2].trim();
      if (['A', 'B', 'C', 'D', 'E'].includes(letter)) {
        choices[letter] = text;
      }
    });

    // If still no choices found, provide default structure
    if (Object.keys(choices).length < 4) {
      return {
        question: problemText,
        choices: {
          'A': 'Option A',
          'B': 'Option B', 
          'C': 'Option C',
          'D': 'Option D',
          'E': 'Option E'
        }
      };
    }

    return {
      question: questionText || problemText,
      choices
    };
  };

  // Submission state
  const [submitting, setSubmitting] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [results, setResults] = useState(null);
  const [userGraph, setUserGraph] = useState(null);

  useEffect(() => {
    loadAssessment();
  }, []);

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
      const storeResult = await AssessmentService.storeAssessment(user.studentId, studentAnswers);

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
      await ChatService.initializeSession(user.studentId, userGraph.userGraph);
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
  const parsedProblem = parseProblemText(currentProblem.problem);
  const progress = ((currentQuestion + 1) / assessment.problems.length) * 100;
  const isLastQuestion = currentQuestion === assessment.problems.length - 1;
  const hasSelectedAnswer = selectedAnswer !== '';

  return (
    <Box>
      {/* Progress Header */}
      <Paper elevation={2} sx={{ mb: 4 }}>
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
            NorseAI Assessment
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <TimerIcon color="action" />
            <Typography color="text.secondary">
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
        <Card elevation={3} sx={{ mb: 4 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
              Question {currentQuestion + 1}
            </Typography>
            
            <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.6, fontSize: '1.1rem' }}>
              {parsedProblem.question}
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
                      borderColor: selectedAnswer === letter ? 'primary.main' : 'grey.300',
                      backgroundColor: selectedAnswer === letter ? 'primary.main' : 'transparent',
                      color: selectedAnswer === letter ? 'white' : 'text.primary',
                      '&:hover': {
                        borderColor: 'primary.main',
                        backgroundColor: selectedAnswer === letter ? 'primary.dark' : 'primary.light',
                        color: selectedAnswer === letter ? 'white' : 'primary.main'
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
                          backgroundColor: selectedAnswer === letter ? 'rgba(255,255,255,0.9)' : 'primary.main',
                          color: selectedAnswer === letter ? 'primary.main' : 'white',
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
                    {parsedProblem.choices[letter]}
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
              px: 3
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
                fontSize: '1.1rem'
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
                px: 3
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