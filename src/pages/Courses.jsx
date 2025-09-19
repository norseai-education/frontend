import React from 'react';
import Layout from '../components/Layout';
import { Container, Typography, Button, Grid, Paper, Box, Card, CardContent, CardActionArea } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts';

// --- Mock Data ---
const courseMetrics = [
  { title: 'Total Courses', value: '24', color: '#3b82f6' },
  { title: 'Students Enrolled', value: '1,280', color: '#06b6d4' },
  { title: 'Avg. Completion Rate', value: '78%', color: '#10b981' },
  { title: 'Active Instructors', value: '12', color: '#f59e0b' },
];

const enrollmentBySubjectData = [
  { subject: 'Math', students: 250 },
  { subject: 'Computer Science', students: 420 },
  { subject: 'AI', students: 310 },
];

const completionRateData = [{ name: 'Completion', value: 78 }];

const courseList = [
  {
    title: 'Foundational Math',
    instructor: 'Dr. Evelyn Reed',
    description: 'Core concepts in mathematics required for advanced studies.',
    category: 'Math',
  },
  {
    title: 'Geometry',
    instructor: 'Dr. Evelyn Reed',
    description: 'A comprehensive study of shapes, sizes, and properties of space.',
    category: 'Math',
  },
  {
    title: 'Calculus I',
    instructor: 'Dr. Evelyn Reed',
    description: 'An introduction to differential and integral calculus.',
    category: 'Math',
  },
  {
    title: 'Data Structures & Algorithms',
    instructor: 'Prof. Samuel Greene',
    description: 'Fundamental concepts in computer science for problem-solving.',
    category: 'Computer Science',
  },
  {
    title: 'Introduction to AI',
    instructor: 'Jane Doe',
    description: 'Explore the foundational principles and applications of Artificial Intelligence.',
    category: 'AI',
  },
  {
    title: 'Machine Learning',
    instructor: 'Jane Doe',
    description: 'Learn to build and train machine learning models for predictive analysis.',
    category: 'AI',
  },
  {
    title: 'Deep Learning',
    instructor: 'Jane Doe',
    description: 'Dive into neural networks and advanced deep learning architectures.',
    category: 'AI',
  },
];

const Courses = () => (
  <Layout>
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Courses Dashboard
        </Typography>
        <Button component={RouterLink} to="/admin" variant="contained">
          Back to Admin
        </Button>
      </Box>

      {/* Key Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {courseMetrics.map((metric, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ backgroundColor: metric.color, color: 'white', height: '100%' }}>
              <CardActionArea sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <CardContent>
                  <Typography variant="h6" component="div" align="center">
                    {metric.title}
                  </Typography>
                  <Typography variant="h3" component="div" fontWeight="bold" align="center">
                    {metric.value}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Graphs */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, height: 300 }}>
            <Typography variant="h6" gutterBottom>Course Enrollment by Subject</Typography>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={enrollmentBySubjectData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="students" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: 300, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6" gutterBottom>Overall Course Completion Rate</Typography>
            <ResponsiveContainer width="100%" height="90%">
              <RadialBarChart 
                innerRadius="70%" 
                outerRadius="100%" 
                data={completionRateData} 
                startAngle={180} 
                endAngle={0}
              >
                <RadialBar
                  background
                  dataKey='value'
                  fill="#10b981"
                />
                <Legend iconSize={10} layout="vertical" verticalAlign="middle" />
                <Tooltip />
              </RadialBarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Course List */}
      <Typography variant="h5" component="h2" fontWeight="bold" sx={{ mb: 3 }}>
        Available Courses
      </Typography>
      <Grid container spacing={3}>
        {courseList.map((course, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardActionArea sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <CardContent sx={{ width: '100%' }}>
                  <Typography variant="h6" component="div" gutterBottom>
                    {course.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Instructor: {course.instructor}
                  </Typography>
                  <Typography variant="body2">
                    {course.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  </Layout>
);

export default Courses;
