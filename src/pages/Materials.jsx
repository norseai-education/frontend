import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Container, Typography, Button, Grid, Paper, Box, Card, CardContent, CardActions, Link, Chip, TextField, InputAdornment } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DescriptionIcon from '@mui/icons-material/Description';
import LinkIcon from '@mui/icons-material/Link';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import SearchIcon from '@mui/icons-material/Search';

// --- Mock Data ---
const materialTypesData = [
  { name: 'Documents', value: 45 },
  { name: 'Videos', value: 30 },
  { name: 'External Links', value: 25 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const allMaterials = [
  {
    title: 'Calculus Cheat Sheet',
    type: 'Document',
    icon: <DescriptionIcon />,
    description: 'A comprehensive PDF covering key formulas and theorems for Calculus I.',
    link: '#',
    course: 'Calculus',
  },
  {
    title: '3Blue1Brown: The Essence of Calculus',
    type: 'Video',
    icon: <VideoLibraryIcon />,
    description: 'An intuitive video series explaining the fundamentals of calculus.',
    link: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr',
    course: 'Calculus',
  },
  {
    title: 'MIT OpenCourseWare: Intro to Algorithms',
    type: 'External Link',
    icon: <LinkIcon />,
    description: 'Full course materials from MIT, including lecture notes and assignments.',
    link: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/',
    course: 'Computer Science',
  },
  {
    title: 'Art of Problem Solving: AMC Resources',
    type: 'External Link',
    icon: <LinkIcon />,
    description: 'A collection of resources and practice problems for the American Mathematics Competitions.',
    link: 'https://artofproblemsolving.com/wiki/index.php/AMC_Problems_and_Solutions',
    course: 'ACM Math Competition',
  },
  {
    title: 'Past ACM Programming Contest Problems',
    type: 'Document',
    icon: <DescriptionIcon />,
    description: 'A repository of past problems from the ACM International Collegiate Programming Contest.',
    link: 'https://icpc.global/community/past-problem-sets',
    course: 'ACM Math Competition',
  },
  {
    title: 'Stanford CS229: Machine Learning',
    type: 'External Link',
    icon: <LinkIcon />,
    description: 'In-depth course notes and videos on Machine Learning from Stanford University.',
    link: 'http://cs229.stanford.edu/',
    course: 'Machine Learning',
  },
  {
    title: 'Deep Learning with PyTorch',
    type: 'Document',
    icon: <DescriptionIcon />,
    description: 'A book-style guide to building deep learning models using PyTorch.',
    link: '#',
    course: 'Deep Learning',
  },
  {
    title: 'Khan Academy: Geometry',
    type: 'Video',
    icon: <VideoLibraryIcon />,
    description: 'A full course of video lessons covering all major topics in Geometry.',
    link: 'https://www.khanacademy.org/math/geometry',
    course: 'Geometry',
  },
];

const courseFilters = ['All', 'Calculus', 'Geometry', 'Computer Science', 'Machine Learning', 'Deep Learning', 'ACM Math Competition'];

const Materials = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filteredMaterials = allMaterials.filter(material => {
    const matchesFilter = selectedFilter === 'All' || material.course === selectedFilter;
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          material.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" fontWeight="bold">
            Educational Materials
          </Typography>
          <Button component={RouterLink} to="/admin" variant="contained">
            Back to Admin
          </Button>
        </Box>

        {/* Graph and Info Section */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, height: 300, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h6" gutterBottom>Material Types</Typography>
              <ResponsiveContainer width="100%" height="90%">
                <PieChart>
                  <Pie data={materialTypesData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value" nameKey="name" label>
                    {materialTypesData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, height: 300 }}>
              <Typography variant="h6" gutterBottom>About Our Materials</Typography>
              <Typography variant="body1" paragraph>
                This section provides a centralized repository of all educational materials. Use the search bar and filters to quickly find the resources you need.
              </Typography>
              <Typography variant="body1" paragraph>
                Our goal is to curate a rich collection of high-quality content. The distribution of material types is regularly reviewed to ensure a balanced and effective learning experience.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Filter and Search Section */}
        <Paper sx={{ p: 2, mb: 4 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search materials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {courseFilters.map(filter => (
                  <Chip
                    key={filter}
                    label={filter}
                    clickable
                    color={selectedFilter === filter ? 'primary' : 'default'}
                    onClick={() => setSelectedFilter(filter)}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Materials List */}
        <Typography variant="h5" component="h2" fontWeight="bold" sx={{ mb: 3 }}>
          {selectedFilter === 'All' ? 'All Materials' : `${selectedFilter} Materials`}
        </Typography>
        <Grid container spacing={3}>
          {filteredMaterials.length > 0 ? filteredMaterials.map((material, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    {material.icon}
                    <Typography variant="h6" component="div" sx={{ ml: 1 }}>{material.title}</Typography>
                  </Box>
                  <Chip label={material.course} size="small" sx={{ mb: 2 }} />
                  <Typography variant="body2" color="text.secondary">{material.description}</Typography>
                </CardContent>
                <CardActions>
                  <Button component={Link} href={material.link} target="_blank" size="small" variant="contained">Access Material</Button>
                </CardActions>
              </Card>
            </Grid>
          )) : (
            <Grid item xs={12}>
              <Typography sx={{ mt: 4, textAlign: 'center' }}>No materials found for the selected criteria.</Typography>
            </Grid>
          )}
        </Grid>
      </Container>
    </Layout>
  );
};

export default Materials;