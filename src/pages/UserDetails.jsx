import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Container, Paper, Typography, Box, Avatar, Button, Divider } from '@mui/material';
import Layout from '../components/Layout';
import KnowledgeGraph from '../components/admin/KnowledgeGraph';
import PerformanceNumberLine from '../components/admin/PerformanceNumberLine';

const UserDetails = () => {
  const location = useLocation();
  const { user } = location.state || {};

  if (!user) {
    return (
      <Layout>
        <Container>
          <Paper sx={{ p: 3, mt: 4 }}>
            <Typography variant="h5">User not found</Typography>
            <Button component={Link} to="/admin" sx={{ mt: 2 }}>
              Back to Admin
            </Button>
          </Paper>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container maxWidth="lg">
        <Paper sx={{ p: 4, mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ width: 100, height: 100, mb: 2 }} />
          <Typography variant="h4" component="h1" gutterBottom>
            {user.fullName}
          </Typography>
          <Button component={Link} to="/admin" sx={{ mt: 3 }}>
            Back to Admin
          </Button>
          <Divider sx={{ width: '100%', my: 3 }} />
          <Box sx={{ textAlign: 'left', width: '100%', mt: 2 }}>
            <Typography variant="body1"><strong>ID:</strong> {user.id}</Typography>
            <Typography variant="body1"><strong>First Name:</strong> {user.firstName}</Typography>
            <Typography variant="body1"><strong>Last Name:</strong> {user.lastName}</Typography>
            <Typography variant="body1"><strong>Age:</strong> {user.age}</Typography>
            <Typography variant="body1"><strong>Parent Name:</strong> {user.parentName}</Typography>
            <Typography variant="body1"><strong>Phone Number:</strong> {user.phoneNumber}</Typography>
          </Box>

          <Divider sx={{ width: '100%', my: 3 }} />
          <Box sx={{ textAlign: 'left', width: '100%' }}>
            <Typography variant="h6" gutterBottom>Assessments Result</Typography>
          </Box>

          <Divider sx={{ width: '100%', my: 3 }} />
          <Box sx={{ textAlign: 'left', width: '100%', mt: 2 }}>
            <Typography variant="body1"><strong>Geometry Assessment:</strong> {user.geometryAssessment || 'N/A'}</Typography>
            <Typography variant="body1"><strong>Machine Learning Assessment:</strong> {user.machineLearningAssessment || 'N/A'}</Typography>
            <Typography variant="body1"><strong>Deep Learning Assessment:</strong> {user.deepLearningAssessment || 'N/A'}</Typography>
          </Box>
          <Box sx={{ textAlign: 'left', width: '100%', mt: 2 }}>
            <Typography variant="body1"><strong>Analytics Assessment:</strong> {user.analyticsAssessment || 'N/A'}</Typography>
          </Box>
          <Divider sx={{ width: '100%', my: 3 }} />
          <Box sx={{ textAlign: 'left', width: '100%', mt: 2 }}>
            <Typography variant="body1"><strong>Overall Performance:</strong> {user.overallPerformance || 'N/A'}</Typography>
            <PerformanceNumberLine performance={user.overallPerformance} />
          </Box>
          <Box sx={{ textAlign: 'left', width: '100%', mt: 2 }}>
            <Typography variant="body1"><strong>Recommendations:</strong> {user.recommendations || 'N/A'}</Typography>
          </Box>
          <Box sx={{ textAlign: 'left', width: '100%', mt: 2 }}>
            <Typography variant="body1"><strong>Progress Tracking:</strong> {user.progressTracking || 'N/A'}</Typography>
          </Box>
          <Divider sx={{ width: '100%', my: 3 }} />
          <Box sx={{ textAlign: 'left', width: '100%', mt: 2 }}>
            <Typography variant="h6" gutterBottom>Knowledge Graph</Typography>
            <KnowledgeGraph />
          </Box>
        </Paper>
      </Container>
    </Layout>
  );
};

export default UserDetails;
