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
  CircularProgress,
} from "@mui/material";
import { ArrowBack, ArrowForward, Close } from "@mui/icons-material";

export default function Quiz() {
  const [time, setTime] = useState(60);
  const [selected, setSelected] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch data from API
  useEffect(() => {
    fetch("http://localhost:5000/api/questions") // <-- replace with your API endpoint
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch questions:", err);
        setLoading(false);
      });
  }, []);

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelected(null);
      setTime(60); // reset timer per question
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelected(null);
      setTime(60);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (questions.length === 0) {
    return (
      <Typography variant="h6" sx={{ mt: 10, textAlign: "center" }}>
        No questions available
      </Typography>
    );
  }

  const question = questions[currentIndex];

  return (
    <Box>
      {/* Header */}
      <AppBar position="static" color="default" elevation={2}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            D world
          </Typography>
          <Box sx={{ display: "flex", gap: 4 }}>
            <Typography>Question Id : {question.id}</Typography>
            <Typography sx={{ fontWeight: "bold" }}>
              Time Remaining 00:00:{time.toString().padStart(2, "0")}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h5" sx={{ color: "red", fontWeight: "bold", mb: 2 }}>
          Question {currentIndex + 1} Of {questions.length}
        </Typography>
        <Typography sx={{ maxWidth: "80%", mx: "auto", mb: 4, color: 'text.primary' }}>
          {question.text}
        </Typography>

        {/* Options */}
        <Box>
          {question.options.map((opt, i) => (
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
                  <Typography sx={{ color: 'black' }}>
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
            <Button
              variant="text"
              startIcon={<ArrowBack />}
              onClick={handlePrevious}
              disabled={currentIndex === 0}
            >
              Previous Questions
            </Button>
          </Grid>
          <Grid item>
            <Button color="error" variant="text" startIcon={<Close />}>
              Skip
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="text"
              endIcon={<ArrowForward />}
              onClick={handleNext}
              disabled={currentIndex === questions.length - 1}
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
