import React from 'react';
import Layout from '../components/Layout';
import { Container, Typography, Button, Grid, Paper, Box, CardActionArea } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell,
} from 'recharts';

// --- Mock Data ---
const studentPerformanceData = [
  { month: 'Jan', avgScore: 65, assessments: 20 },
  { month: 'Feb', avgScore: 70, assessments: 25 },
  { month: 'Mar', avgScore: 78, assessments: 30 },
  { month: 'Apr', avgScore: 75, assessments: 28 },
  { month: 'May', avgScore: 82, assessments: 35 },
  { month: 'Jun', avgScore: 85, assessments: 40 },
];

const subjectBreakdownData = [
  { name: 'Math', value: 400 },
  { name: 'Science', value: 300 },
  { name: 'History', value: 300 },
  { name: 'English', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const engagementData = [
    { day: 'Mon', hours: 2.5 },
    { day: 'Tue', hours: 3 },
    { day: 'Wed', hours: 4 },
    { day: 'Thu', hours: 3.5 },
    { day: 'Fri', hours: 5 },
    { day: 'Sat', hours: 6 },
    { day: 'Sun', hours: 4.5 },
];


const Analysis = () => (
  <Layout>
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Student Performance Analysis
        </Typography>
        <Button component={RouterLink} to="/admin" variant="contained">
          Back to Admin
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Document/Notes Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <CardActionArea>
              <Typography variant="h6" gutterBottom>Analyst Notes & Documentation</Typography>
              <Typography variant="body1" paragraph>
                This document summarizes the key findings from the student performance data collected over the last six months. The primary goal is to identify trends in student engagement, subject mastery, and overall assessment outcomes.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Key Observation 1:</strong> There is a consistent upward trend in average assessment scores, indicating effective learning progression. May and June show significant improvements.
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                <strong>Key Observation 2:</strong> Math is the most frequently assessed subject, followed by Science and History. This may suggest a curriculum focus or higher student enrollment in these areas.
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                <strong>Key Observation 3:</strong> Student engagement, measured in hours, peaks over the weekend, particularly on Saturday. This highlights a potential opportunity for targeted weekend learning modules.
              </Typography>
            </CardActionArea>
          </Paper>
        </Grid>

        {/* Graphs Section */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ height: 400 }}>
            <CardActionArea sx={{ height: '100%', p: 2 }}>
              <Typography variant="h6" gutterBottom>Monthly Performance Trend</Typography>
              <ResponsiveContainer width="100%" height="90%">
                <LineChart data={studentPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="avgScore" name="Average Score" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="assessments" name="Assessments Taken" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </CardActionArea>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ height: 400 }}>
            <CardActionArea sx={{ height: '100%', p: 2, paddingLeft: '24px', paddingRight: '24px' }}>
              <Typography variant="h6" gutterBottom>Subject Breakdown</Typography>
              <ResponsiveContainer width="100%" height="90%">
                <PieChart>
                  <Pie
                    data={subjectBreakdownData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={(entry) => entry.name}
                  >
                    {subjectBreakdownData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardActionArea>
          </Paper>
        </Grid>
        
        <Grid item xs={12}>
            <Paper sx={{ height: 400 }}>
              <CardActionArea sx={{ height: '100%', p: 2 }}>
                <Typography variant="h6" gutterBottom>Weekly Student Engagement (Hours)</Typography>
                <ResponsiveContainer width="100%" height="90%">
                    <BarChart data={engagementData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="hours" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
              </CardActionArea>
            </Paper>
        </Grid>

      </Grid>
    </Container>
  </Layout>
);

export default Analysis;
