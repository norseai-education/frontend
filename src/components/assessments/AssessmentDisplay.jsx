import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Container,
  Chip,
  Divider
} from '@mui/material';
import { AssessmentAPI } from '../../api/assessment';

const AssessmentDisplay = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await AssessmentAPI.giveAssessment();
        setData(response);
        console.log('Assessment data:', response);
      } catch (err) {
        console.error('Error fetching assessment:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAssessment();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        Error loading assessment: {error}
      </Alert>
    );
  }

  if (!data) {
    return (
      <Alert severity="info" sx={{ m: 2 }}>
        No assessment data available
      </Alert>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Assessment Problems
        </Typography>
        <Chip 
          label={`${data.number_problems} Problems`} 
          color="primary" 
          variant="outlined"
          sx={{ fontSize: '1rem', py: 2, px: 3 }}
        />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {data.problems.map((problem, index) => (
          <Card 
            key={index} 
            sx={{ 
              boxShadow: 3,
              borderRadius: 2,
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 6
              }
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography 
                variant="h5" 
                component="h2" 
                gutterBottom
                sx={{ 
                  color: 'primary.main',
                  fontWeight: 'bold',
                  mb: 2
                }}
              >
                Problem {index + 1}
              </Typography>
              
              <Divider sx={{ mb: 2 }} />
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {Object.entries(problem).map(([key, value]) => (
                  <Box key={key} sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    <Typography 
                      variant="subtitle2" 
                      sx={{ 
                        fontWeight: 'bold',
                        minWidth: '120px',
                        color: 'text.secondary'
                      }}
                    >
                      {key.replace(/_/g, ' ').toUpperCase()}:
                    </Typography>
                    <Typography 
                      variant="body1"
                      sx={{ 
                        flex: 1,
                        wordBreak: 'break-word'
                      }}
                    >
                      {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default AssessmentDisplay;
