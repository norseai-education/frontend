// // Quiz.js
// import React, { useState, useEffect, useCallback } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Box,
//   Container,
//   Card,
//   CardActionArea,
//   CardContent,
//   Button,
//   Grid,
//   CircularProgress,
//   Alert,
//   Paper,
//   LinearProgress,
// } from "@mui/material";
// import { ArrowBack, ArrowForward, Close, CheckCircle, Cancel } from "@mui/icons-material";
// import AssessmentAPI from '../../api/assessment';

// export default function Quiz() {
//   const [assessment, setAssessment] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [time, setTime] = useState(300); // 5 minutes
//   const [selected, setSelected] = useState(null);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [answers, setAnswers] = useState([]);
//   const [result, setResult] = useState(null);
//   const [startTime, setStartTime] = useState(null);

//   // Fetch assessment data from API
//   useEffect(() => {
//     checkAPIAndFetch();
//   }, [checkAPIAndFetch]);

//   const checkAPIAndFetch = useCallback(async () => {
//     try {
//       // First check if API is available
//       const isHealthy = await AssessmentAPI.healthCheck();
//       if (!isHealthy) {
//         setError('Assessment server is currently unavailable. Please try again later.');
//         setLoading(false);
//         return;
//       }
//       // If API is healthy, fetch the assessment
//       await fetchAssessment();
//     } catch (err) {
//       console.error('API health check failed:', err);
//       setError('Unable to connect to the assessment server. Please check your connection.');
//       setLoading(false);
//     }
//   }, []);

//   // Timer effect
//   useEffect(() => {
//     if (assessment && !result) {
//       const timer = setInterval(() => {
//         setTime((prev) => (prev > 0 ? prev - 1 : 0));
//       }, 1000);
//       return () => clearInterval(timer);
//     }
//   }, [assessment, result]);

//   const fetchAssessment = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const data = await AssessmentAPI.fetchAssessment(1);
//       setAssessment(data);
//       setTime(data.time_limit);
//       setStartTime(Date.now());

//       // Initialize answers array
//       setAnswers(new Array(data.questions.length).fill(null));

//     } catch (err) {
//       console.error('Error fetching assessment:', err);
//       // Set a more user-friendly error message
//       if (err.message.includes('fetch')) {
//         setError('Unable to connect to the assessment server. Please check your connection and try again.');
//       } else {
//         setError('Failed to load assessment. Please try again later.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const submitAssessment = async () => {
//     try {
//       const timeTaken = Math.floor((Date.now() - startTime) / 1000);
//       const resultData = await AssessmentAPI.submitAssessment(assessment.id, answers, timeTaken);
//       setResult(resultData);

//     } catch (err) {
//       setError(err.message);
//       console.error('Error submitting assessment:', err);
//     }
//   };

//   const handleNext = () => {
//     if (currentQuestion < assessment.questions.length - 1) {
//       setCurrentQuestion(currentQuestion + 1);
//       setSelected(answers[currentQuestion + 1]);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentQuestion > 0) {
//       setCurrentQuestion(currentQuestion - 1);
//       setSelected(answers[currentQuestion - 1]);
//     }
//   };

//   const handleSkip = () => {
//     if (currentQuestion < assessment.questions.length - 1) {
//       setCurrentQuestion(currentQuestion + 1);
//       setSelected(answers[currentQuestion + 1]);
//     }
//   };

//   const handleAnswerSelect = (optionIndex) => {
//     setSelected(optionIndex);
//     const newAnswers = [...answers];
//     newAnswers[currentQuestion] = optionIndex;
//     setAnswers(newAnswers);
//   };

//   const handleSubmit = () => {
//     submitAssessment();
//   };

//   const handleRetry = () => {
//     setAssessment(null);
//     setResult(null);
//     setCurrentQuestion(0);
//     setSelected(null);
//     setAnswers([]);
//     setError(null);
//     checkAPIAndFetch();
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
//         <CircularProgress size={60} />
//         <Typography sx={{ ml: 2 }}>Loading Assessment...</Typography>
//       </Box>
//     );
//   }

//   // Error state - show a more graceful fallback
//   if (error) {
//     return (
//       <Container maxWidth="md" sx={{ mt: 4 }}>
//         <Paper sx={{ p: 4, textAlign: 'center' }}>
//           <Typography variant="h6" color="text.secondary" gutterBottom>
//             Assessment Unavailable
//           </Typography>
//           <Typography variant="body1" sx={{ mb: 3 }}>
//             {error}
//           </Typography>
//           <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
//             <Button variant="contained" onClick={handleRetry}>
//               Try Again
//             </Button>
//             <Button variant="outlined" onClick={() => window.location.reload()}>
//               Refresh Page
//             </Button>
//           </Box>
//         </Paper>
//       </Container>
//     );
//   }

//   // Results state
//   if (result) {
//     return (
//       <Container maxWidth="md" sx={{ mt: 4 }}>
//         <Paper sx={{ p: 4, textAlign: 'center' }}>
//           <Typography variant="h4" gutterBottom sx={{ color: '#1976d2' }}>
//             Assessment Complete!
//           </Typography>

//           <Box sx={{ my: 4 }}>
//             <Typography variant="h2" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
//               {result.score.toFixed(1)}%
//             </Typography>
//             <Typography variant="h6" color="text.secondary">
//               {result.correct_answers} out of {result.total_questions} correct
//             </Typography>
//           </Box>

//           <Box sx={{ mb: 4 }}>
//             <Typography variant="body1" sx={{ mb: 2 }}>
//               Time taken: {Math.floor(result.time_taken / 60)}:{(result.time_taken % 60).toString().padStart(2, '0')}
//             </Typography>

//             <LinearProgress
//               variant="determinate"
//               value={result.score}
//               sx={{
//                 height: 10,
//                 borderRadius: 5,
//                 mb: 2,
//                 '& .MuiLinearProgress-bar': {
//                   backgroundColor: result.score >= 70 ? '#4caf50' : result.score >= 50 ? '#ff9800' : '#f44336'
//                 }
//               }}
//             />
//           </Box>

//           <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
//             <Button variant="contained" onClick={handleRetry}>
//               Take Assessment Again
//             </Button>
//             <Button variant="outlined" onClick={() => window.location.reload()}>
//               Back to Home
//             </Button>
//           </Box>
//         </Paper>
//       </Container>
//     );
//   }

//   // Main assessment interface
//   if (!assessment) return null;

//   const currentQ = assessment.questions[currentQuestion];
//   const progress = ((currentQuestion + 1) / assessment.questions.length) * 100;

//   return (
//     <Box>
//       {/* Header */}
//       <AppBar position="static" sx={{ bgcolor: '#1a1a1a', color: 'white' }} elevation={2}>
//         <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
//           <Typography variant="h6" sx={{ fontWeight: "bold" }}>
//             {assessment.title}
//           </Typography>
//           <Box sx={{ display: "flex", gap: 4 }}>
//             <Typography>Question {currentQuestion + 1} of {assessment.questions.length}</Typography>
//             <Typography sx={{ fontWeight: "bold" }}>
//               Time Remaining {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, "0")}
//             </Typography>
//           </Box>
//         </Toolbar>
//       </AppBar>

//       {/* Progress Bar */}
//       <LinearProgress
//         variant="determinate"
//         value={progress}
//         sx={{
//           height: 8,
//           '& .MuiLinearProgress-bar': {
//             backgroundColor: '#1976d2'
//           }
//         }}
//       />

//       {/* Main Content */}
//       <Container sx={{ textAlign: "center", mt: 5, color: 'black' }}>
//         <Typography variant="h5" sx={{ color: "#1976d2", fontWeight: "bold", mb: 2 }}>
//           Question {currentQuestion + 1} Of {assessment.questions.length}
//         </Typography>
//         <Typography sx={{ maxWidth: "80%", mx: "auto", mb: 4, color: 'black' }}>
//           {currentQ.question}
//         </Typography>

//         {/* Options */}
//         <Box>
//           {currentQ.options.map((opt, i) => (
//             <Card
//               key={i}
//               variant="outlined"
//               sx={{
//                 border: selected === i ? "3px solid #1976d2" : "2px solid #1976d2",
//                 mb: 2,
//                 bgcolor: selected === i ? "#e3f2fd" : "white",
//                 '&:hover': {
//                   borderColor: '#1565c0',
//                   bgcolor: '#f5f5f5'
//                 },
//                 cursor: 'pointer'
//               }}
//               onClick={() => handleAnswerSelect(i)}
//             >
//               <CardActionArea>
//                 <CardContent sx={{ textAlign: "left", display: 'flex', alignItems: 'center' }}>
//                   <Box sx={{
//                     width: 30,
//                     height: 30,
//                     borderRadius: '50%',
//                     border: '2px solid #1976d2',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     mr: 2,
//                     bgcolor: selected === i ? '#1976d2' : 'transparent',
//                     color: selected === i ? 'white' : '#1976d2',
//                     fontWeight: 'bold'
//                   }}>
//                     {String.fromCharCode(65 + i)}
//                   </Box>
//                   <Typography sx={{ color: 'black', flex: 1 }}>
//                     {opt}
//                   </Typography>
//                   {selected === i && (
//                     <CheckCircle sx={{ color: '#1976d2', ml: 1 }} />
//                   )}
//                 </CardContent>
//               </CardActionArea>
//             </Card>
//           ))}
//         </Box>

//         {/* Navigation */}
//         <Grid container spacing={2} justifyContent="center" sx={{ mt: 4 }}>
//           <Grid item>
//             <Button
//               variant="outlined"
//               startIcon={<ArrowBack />}
//               sx={{ color: '#1976d2', borderColor: '#1976d2' }}
//               onClick={handlePrevious}
//               disabled={currentQuestion === 0}
//             >
//               Previous
//             </Button>
//           </Grid>
//           <Grid item>
//             <Button
//               variant="outlined"
//               startIcon={<Close />}
//               sx={{ color: '#424242', borderColor: '#424242' }}
//               onClick={handleSkip}
//               disabled={currentQuestion === assessment.questions.length - 1}
//             >
//               Skip
//             </Button>
//           </Grid>
//           <Grid item>
//             <Button
//               variant="outlined"
//               endIcon={<ArrowForward />}
//               sx={{ color: '#1976d2', borderColor: '#1976d2' }}
//               onClick={handleNext}
//               disabled={currentQuestion === assessment.questions.length - 1}
//             >
//               Next
//             </Button>
//           </Grid>
//         </Grid>

//         {/* Submit Button */}
//         {currentQuestion === assessment.questions.length - 1 && (
//           <Box sx={{ mt: 4 }}>
//             <Button
//               variant="contained"
//               size="large"
//               sx={{
//                 bgcolor: '#1976d2',
//                 '&:hover': { bgcolor: '#1565c0' },
//                 px: 4,
//                 py: 1.5
//               }}
//               onClick={handleSubmit}
//               disabled={answers.filter(a => a !== null).length === 0}
//             >
//               Submit Assessment
//             </Button>
//           </Box>
//         )}
//       </Container>
//     </Box>
//   );
// }
// // End of Quiz.js

// Quiz.js
import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  Card,
  CardActionArea,
  CardContent,
  Button,
  Grid,
} from "@mui/material";
import { ArrowBack, ArrowForward, Close } from "@mui/icons-material";

export default function Quiz() {
  const [time, setTime] = useState(60);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const options = [
    "Lorem ipsum dolor sit amet.",
    "Lorem ipsum dolor sit amet.",
    "Lorem ipsum dolor sit amet.",
  ];

  return (
    <Box>
      {/* Header */}
      <AppBar position="static" color="default" elevation={2}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            D world
          </Typography>
          <Box sx={{ display: "flex", gap: 4 }}>
            <Typography>Question Id : 24</Typography>
            <Typography sx={{ fontWeight: "bold" }}>
              Time Remaining 00:00:{time.toString().padStart(2, "0")}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h5" sx={{ color: "red", fontWeight: "bold", mb: 2 }}>
          Question 1 Of 10
        </Typography>
        <Typography sx={{ maxWidth: "80%", mx: "auto", mb: 4 }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste quasi
          sunt eius voluptatum corrupti atque asperiores nesciunt, in inventore
          consequatur, dolorum incidunt blanditiis? Minima sed commodi non
          voluptates sint possimus molestiae sunt necessitatibus quibusdam
          accusamus ullam nesciunt odio consequuntur corporis quod, nulla cum,
          adipisci blanditiis asperiores velit doloremque! Veritatis, sed.
        </Typography>

        {/* Options */}
        <Box>
          {options.map((opt, i) => (
            <Card
              key={i}
              variant="outlined"
              sx={{
                border: "2px solid red",
                mb: 2,
                bgcolor: selected === i ? "#ffe6e6" : "white",
              }}
              onClick={() => setSelected(i)}
            >
              <CardActionArea>
                <CardContent sx={{ textAlign: "left" }}>
                  <Typography>
                    {String.fromCharCode(65 + i)}. {opt}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>

        {/* Navigation */}
        <Grid container spacing={2} justifyContent="center" sx={{ mt: 4 }}>
          <Grid item>
            <Button variant="text" startIcon={<ArrowBack />}>
              Previous Questions
            </Button>
          </Grid>
          <Grid item>
            <Button color="error" variant="text" startIcon={<Close />}>
              Skip
            </Button>
          </Grid>
          <Grid item>
            <Button variant="text" endIcon={<ArrowForward />}>
              Next
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
