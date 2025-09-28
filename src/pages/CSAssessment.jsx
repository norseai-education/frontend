import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AppBar, Toolbar, Typography, Box, Grid, Drawer, List, ListItem, ListItemIcon, 
  ListItemText, Button, Divider, Avatar, Card, CardContent, CircularProgress 
} from '@mui/material';
import { AccessTime, Psychology, BarChart, Add, Subject, EmojiObjects, Insights, Dashboard as DashboardIcon } from '@mui/icons-material';
import { useAuth0 } from '@auth0/auth0-react';
import AssessmentService from '../services/assessmentService';
import ChatService from '../services/chatService';

const drawerWidth = 240;

// The main CSAssessment component containing all the logic and UI
const CSAssessment = () => {
  const navigate = useNavigate(); // 2. Initialize the navigate function
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [error, setError] = useState('');

  // 3. Create a handler to navigate to the Math Assessment page

  const startLesson = async () => {
    // Ensure user is authenticated before making API calls
    if (!isAuthenticated || !user) {
      setError("You must be logged in to start a lesson.");
      return;
    }
    setError(''); // Clear previous errors

    try {
      // Use the user's unique ID from Auth0 (user.sub)
      const checkResult = await AssessmentService.checkNeedAssessment(user.sub);
      console.log(checkResult);
      console.log(user.sub);
      
      if (checkResult.give_assessment) {
        // New student needs assessment
        navigate('/math-assessment'); // Navigate to the assessment page
      } else {
        // Existing student, initialize chat session
        try {
          await ChatService.initializeSession(user.sub);
          navigate('/chat'); // Navigate to the chat page
        } catch (chatError) {
          console.error('Failed to initialize chat session:', chatError);
          setError('Failed to start the lesson. Please try again later.');
        }
      }
    } catch (apiError) {
      console.error('Error checking assessment status:', apiError);
      setError('Could not connect to the server. Please check your connection.');
    }
  };

  // Show a loading spinner while Auth0 is initializing
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }
  
  return (
    <Box sx={{ display: 'flex' }}>
      {/* Header */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: '#fff',
          borderBottom: '1px solid #e0e0e0',
          color: '#424242'
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="body2" sx={{ fontWeight: 'medium', color: '#616161' }}>
            Start leveling up and building your weekly streak!
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <AccessTime fontSize="small" sx={{ color: '#9e9e9e' }} />
              <Typography variant="caption" sx={{ fontWeight: 'semibold' }}>0 week streak</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Psychology fontSize="small" sx={{ color: '#9e9e9e' }} />
              <Box sx={{ width: 160, backgroundColor: '#e0e0e0', borderRadius: '50px', height: 10 }}>
                <Box sx={{ backgroundColor: '#4caf50', height: 10, borderRadius: '50px', width: '0%' }} />
              </Box>
              <Typography variant="caption" sx={{ fontWeight: 'semibold' }}>Level 1</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="caption" sx={{ color: '#9e9e9e', fontWeight: 'semibold' }}>0/1 skill</Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', borderRight: '1px solid #e0e0e0', backgroundColor: '#fff' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', p: 3, pt: 0 }}>
          {/* User Profile Card */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
            <Avatar sx={{ width: 64, height: 64, mb: 1, bgcolor: '#8bc34a' }}>
              🐸
            </Avatar>
            <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>jruvu2</Typography>
            <Typography variant="caption" color="primary" sx={{ cursor: 'pointer' }}>Pick a username • Add your bio</Typography>
          </Box>

          <Button
            variant="outlined"
            fullWidth
            sx={{ mb: 3, borderRadius: '8px', textTransform: 'none' }}
          >
            Edit Profile
          </Button>

          {/* Navigation */}
          <Divider sx={{ mb: 2 }} />
          <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 'bold', mb: 1, display: 'block' }}>MY STUFF</Typography>
          <List>
            <ListItem sx={{ borderRadius: '8px', bgcolor: 'primary.light', color: 'primary.main', mb: 0.5, cursor: 'pointer' }}>
              <ListItemText primary="Courses" />
            </ListItem>
            <ListItem sx={{ borderRadius: '8px', mb: 0.5, cursor: 'pointer' }}>
              <ListItemText primary="Progress" />
            </ListItem>
            <ListItem sx={{ borderRadius: '8px', mb: 0.5, cursor: 'pointer' }}>
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem sx={{ borderRadius: '8px', mb: 0.5, cursor: 'pointer' }}>
              <ListItemText primary="Teachers" />
            </ListItem>
          </List>
          <Divider sx={{ mt: 2 }} />

          {/* NORSEAI Promo */}
          <Card elevation={0} sx={{ mt: 3, p: 2, bgcolor: '#e1bee7', color: '#6a1b9a', textAlign: 'center', borderRadius: '12px' }}>
            <CardContent>
              <Typography variant="h5">✨</Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>NORSEAI</Typography>
              <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
                Get NORSEAI available now for <span style={{ fontWeight: 'bold' }}>FREE</span> for the first 30 days!
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 2, bgcolor: '#9c27b0', color: '#fff', borderRadius: '50px', textTransform: 'none' }}
              >
                Learn more
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Drawer>

      {/* Main Content Area */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, pt: 10 }}>
        <Card elevation={1} sx={{ borderRadius: '12px', p: 4, bgcolor: '#fff' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold' }}>My courses</Typography>
            <Button variant="contained" sx={{ bgcolor: '#1e88e5', textTransform: 'none', borderRadius: '8px' }}>
              Edit Courses
            </Button>
          </Box>
          
          {/* Display error message if exists */}
          {error && (
            <Box sx={{ mb: 2 }}>
              <Typography color="error" variant="body2">{error}</Typography>
            </Box>
          )}

          <Grid container spacing={4}>
            {/* Course Section */}
            <Grid item xs={12} sm={6} md={4}>
              <Card elevation={0} sx={{ borderRadius: '8px', p: 2, border: '1px solid #e0e0e0' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'semibold' }}>AMC 8 Topics</Typography>
                  <Typography variant="caption" color="primary" sx={{ cursor: 'pointer' }}>See all (6)</Typography>
                </Box>
                <List dense disablePadding>
                  {[
                    { text: 'Arithmetic', icon: <Insights /> },
                    { text: 'Algebra', icon: <BarChart /> },
                    { text: 'Geometry', icon: <DashboardIcon /> },
                    { text: 'Number Theory', icon: <Subject /> },
                    { text: 'Counting and Probability', icon: <EmojiObjects /> },
                    { text: 'Logic', icon: <Psychology /> },
                  ].map((item, index) => (
                    <ListItem key={index} disableGutters sx={{ alignItems: 'flex-start', mb: 1 }}>
                      <ListItemIcon sx={{ minWidth: 32, mt: 0.5 }}><Box component="span" sx={{ fontSize: '1.2rem' }}>{item.icon}</Box></ListItemIcon>
                      <ListItemText primary={item.text} sx={{ '& .MuiListItemText-primary': { fontWeight: 'medium' } }} />
                      {index === 0 && (
                        <Button 
                          variant="contained" 
                          size="small" 
                          onClick={startLesson}
                          sx={{ ml: 2, bgcolor: '#2196f3', textTransform: 'none', borderRadius: '50px', whiteSpace: 'nowrap' }}
                        >
                          Start
                        </Button>
                      )}
                    </ListItem>
                  ))}
                </List>
              </Card>
            </Grid>
            
            {/* Add another course placeholder */}
            <Grid item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '250px',
                  p: 4,
                  border: '2px dashed #bdbdbd',
                  borderRadius: '12px',
                  color: '#757575',
                  cursor: 'pointer',
                  '&:hover': {
                    borderColor: '#1e88e5',
                    color: '#1e88e5',
                  },
                }}
              >
                <Add sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>Add another course</Typography>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </Box>
  );
};

export default CSAssessment;

