import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Box,
  LinearProgress,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from '@mui/material';
import Layout from '../components/Layout';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ReplayIcon from '@mui/icons-material/Replay';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { questions } from './questions';

const MachineLearningAssessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(50 * 60); // 50 minutes in seconds
  const [quizStarted, setQuizStarted] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    if (!quizStarted || showScore || timeLeft <= 0) return;

    const timerId = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    if (timeLeft === 1) {
        setShowScore(true);
    }

    return () => clearTimeout(timerId);
  }, [timeLeft, quizStarted, showScore]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleStartQuiz = () => setQuizStarted(true);

  const handleAnswerOptionClick = (answerOption) => {
    if (isAnswered) return;

    setSelectedAnswer(answerOption);
    setIsAnswered(true);
    if (answerOption.isCorrect) {
      setScore(score + 1);
    }

    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
        setIsAnswered(false);
        setSelectedAnswer(null);
      } else {
        setShowScore(true);
      }
    }, 1200);
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setIsAnswered(false);
      setSelectedAnswer(null);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setShowScore(false);
    setScore(0);
    setTimeLeft(50 * 60);
    setQuizStarted(false);
    setIsAnswered(false);
    setSelectedAnswer(null);
  };

  const getAnswerButtonStyle = (answerOption) => {
    const baseStyle = {
      p: 2,
      justifyContent: 'center',
      textTransform: 'none',
      borderRadius: 2,
      height: '100%',
    };

    if (isAnswered) {
      if (answerOption.isCorrect) {
        return { ...baseStyle, backgroundColor: 'success.light', borderColor: 'success.main', color: 'black' };
      }
      if (answerOption === selectedAnswer && !answerOption.isCorrect) {
        return { ...baseStyle, backgroundColor: 'error.light', borderColor: 'error.main', color: 'black' };
      }
      return { ...baseStyle, color: 'text.disabled', borderColor: 'rgba(0, 0, 0, 0.12)' };
    }

    return {
      ...baseStyle,
      color: 'primary.main',
      borderColor: 'rgba(0, 0, 0, 0.23)',
      '&:hover': {
        backgroundColor: 'primary.light',
        borderColor: 'primary.main',
      },
    };
  };

  const renderStartScreen = () => (
    <Paper elevation={0} sx={{ p: { xs: 2, sm: 4 }, maxWidth: '800px', width: '100%', textAlign: 'center', backgroundColor: '#fff', borderRadius: 4 }}>
        <Avatar sx={{ mx: 'auto', mb: 2, width: 56, height: 56, color: 'primary.main' }}>
            <MenuBookIcon fontSize="large" />
        </Avatar>
        <Typography variant="h2" component="h1" fontWeight="bold" gutterBottom>
            Machine Learning Quiz
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: '550px', mx: 'auto' }}>
            Test your knowledge of Machine Learning and AI. Answer multiple choice questions and see how well you know the fundamentals!
        </Typography>

        <Grid container spacing={2} justifyContent="center" sx={{ mb: 4 }}>
            <Grid item xs={12} sm={4}>
                <Paper variant="outlined" sx={{ p: 2, borderRadius: 3, borderColor: 'rgba(0, 0, 0, 0.08)', bgcolor: '#f0f7ff' }}>
                    <MenuBookIcon sx={{ color: '#1976d2' }} />
                    <Typography variant="h4" fontWeight="bold">{questions.length}</Typography>
                    <Typography color="text.secondary">Questions</Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Paper variant="outlined" sx={{ p: 2, borderRadius: 3, borderColor: 'rgba(0, 0, 0, 0.08)', bgcolor: '#f3e5f5' }}>
                    <AccessTimeIcon sx={{ color: '#9c27b0' }} />
                    <Typography variant="h4" fontWeight="bold">50:00</Typography>
                    <Typography color="text.secondary">Minutes</Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Paper variant="outlined" sx={{ p: 2, borderRadius: 3, borderColor: 'rgba(0, 0, 0, 0.08)', bgcolor: '#e8f5e9' }}>
                    <EmojiEventsIcon sx={{ color: '#2e7d32' }} />
                    <Typography variant="h4" fontWeight="bold">100%</Typography>
                    <Typography color="text.secondary">Max Score</Typography>
                </Paper>
            </Grid>
        </Grid>

        <Typography variant="h6" fontWeight="bold" color="text.primary" sx={{ mb: 2 }}>
            Quiz Rules
        </Typography>
        <Paper variant="outlined" sx={{ p: 2, borderRadius: 3, bgcolor: '#fafafa', maxWidth: '600px', mx: 'auto', mb: 4 }}>
            <List dense>
                {[
                    'Each question has multiple choice answers.',
                    'You have 50 minutes to complete all questions.',
                    "Once you select an answer, you'll see the explanation.",
                    'You can navigate back to previous questions.',
                ].map((text, index) => (
                    <ListItem key={index} sx={{ py: 0.5 }}>
                        <ListItemAvatar sx={{ minWidth: 36 }}>
                            <Avatar sx={{ bgcolor: '#e3f2fd', color: '#1565c0', width: 24, height: 24, fontSize: '0.8rem', fontWeight: 'bold' }}>
                                {index + 1}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={text} primaryTypographyProps={{ color: 'text.secondary' }} />
                    </ListItem>
                ))}
            </List>
        </Paper>

        <Button
            variant="contained"
            size="large"
            startIcon={<PlayArrowIcon />}
            onClick={handleStartQuiz}
            disabled={questions.length === 0}
            sx={{
                px: 5,
                py: 1.5,
                borderRadius: '50px',
                color: 'white',
                background: 'linear-gradient(45deg, #2196F3 30%, #673AB7 90%)',
                boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                transition: 'transform 0.2s',
                '&:hover': {
                    transform: 'scale(1.05)'
                }
            }}
        >
            Start Quiz
        </Button>
    </Paper>
  );

  const renderQuiz = () => {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    return (
    <Paper elevation={0} sx={{ p: { xs: 2, sm: 4 }, maxWidth: '900px', width: '100%', backgroundColor: '#fff', borderRadius: 4, border: '1px solid #e0e0e0' }}>
        <Box sx={{ mb: 4 }}>
            <Grid container alignItems="center" spacing={2}>
                <Grid item>
                    <Typography variant="body2" color="text.secondary">
                        Question {currentQuestion + 1} of {questions.length}
                    </Typography>
                </Grid>
                <Grid item xs>
                    <LinearProgress
                        variant="determinate"
                        value={progress}
                        sx={{ height: 8, borderRadius: 5, bgcolor: 'grey.200' }}
                    />
                </Grid>
                <Grid item>
                    <Typography variant="body2" fontWeight="bold" color="text.secondary">{Math.round(progress)}%</Typography>
                </Grid>
                <Grid item>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'success.main' }}>
                        <AccessTimeIcon fontSize="small" />
                        <Typography variant="body2" fontWeight="bold">{formatTime(timeLeft)}</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
        
        <Box sx={{ textAlign: 'center', my: 5 }}>
            <Typography variant="h4" component="h2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                {questions[currentQuestion].questionText}
            </Typography>
        </Box>

        <Grid container spacing={2} sx={{ mb: 4 }}>
            {questions[currentQuestion].answerOptions.map((answerOption, index) => (
                <Grid item xs={12} sm={6} key={index}>
                    <Button
                        fullWidth
                        variant="outlined"
                        onClick={() => handleAnswerOptionClick(answerOption)}
                        disabled={isAnswered}
                        sx={getAnswerButtonStyle(answerOption)}
                    >
                        {answerOption.answerText}
                    </Button>
                </Grid>
            ))}
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 4 }}>
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={handlePreviousQuestion}
                disabled={currentQuestion === 0}
                sx={{
                    bgcolor: 'grey.100',
                    color: 'text.secondary',
                    textTransform: 'none',
                    '&:hover': { bgcolor: 'grey.200' },
                    '&.Mui-disabled': {
                        bgcolor: 'grey.50',
                        color: 'grey.400'
                    }
                }}
            >
                Previous
            </Button>
        </Box>
    </Paper>
  )};

  const renderScoreScreen = () => {
    const percentage = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;
    return (
      <Paper elevation={3} sx={{ p: { xs: 3, sm: 5 }, maxWidth: '700px', textAlign: 'center', borderRadius: 3 }}>
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          Quiz Complete!
        </Typography>
        <Box sx={{ position: 'relative', display: 'inline-flex', my: 4 }}>
          <CircularProgress variant="determinate" value={percentage} size={140} thickness={4} color={percentage >= 70 ? 'success' : 'warning'} />
          <Box sx={{ top: 0, left: 0, bottom: 0, right: 0, position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h3" component="div" fontWeight="bold" color="text.primary">
              {`${percentage}%`}
            </Typography>
          </Box>
        </Box>
        <Typography variant="h5" sx={{ mb: 5 }}>
          You scored {score} out of {questions.length}
        </Typography>
        <Button variant="contained" size="large" startIcon={<ReplayIcon />} onClick={handleRestartQuiz} sx={{ px: 4, py: 1 }}>
          Restart Quiz
        </Button>
      </Paper>
    );
  };

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 4, minHeight: '80vh', bgcolor: '#0f172a' }}>
        {questions.length === 0 ? (
            <Paper elevation={3} sx={{p: 4, textAlign: 'center'}}>
                <Typography variant="h6" color="error">Error: No questions found.</Typography>
                <Typography>Please add questions to <code>src/pages/questions.js</code>.</Typography>
            </Paper>
        ) : showScore ? renderScoreScreen() : (quizStarted ? renderQuiz() : renderStartScreen())}
      </Container>
    </Layout>
  );
};

export default MachineLearningAssessment;
