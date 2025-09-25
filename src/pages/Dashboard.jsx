import React from 'react';
import { 
  Box, 
  Container, 
  Paper, 
  Typography, 
  Divider, 
  Grid, 
  Stack,
  InputBase,
  IconButton
} from '@mui/material';
import Layout from '../components/Layout';
import SearchIcon from '@mui/icons-material/Search';
import MainChat from './ManChat';

/**
 * The main dashboard page with a two-column layout (4/8 split).
 */
const Dashboard = () => {
  return (
    <Layout>
      <Box sx={{ flexGrow: 1, bgcolor: '#f7f9fc', p: { xs: 2, sm: 4 } }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h1" fontWeight="bold" sx={{ mb: 2 }}>
            Dashboard
          </Typography>

          {/* Main Search Bar */}
          <Paper
            component="form"
            sx={{ p: '4px 8px', display: 'flex', alignItems: 'center', width: '100%', mb: 4, border: '1px solid #e0e0e0', boxShadow: 'none', borderRadius: 2 }}
          >
            <IconButton sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search dashboard..."
              inputProps={{ 'aria-label': 'search dashboard' }}
            />
          </Paper>
          
          <Paper sx={{ p: { xs: 2, md: 0 }, borderRadius: 3, width: '100%' }}>
            <Grid container>
              {/* Left Column (4/12 width) */}
              <Grid 
                item 
                xs={12} 
                md={4} 
                sx={{ 
                  p: { xs: 2, md: 3 }, 
                  borderRight: { md: '1px solid' }, 
                  borderColor: { md: 'divider' } 
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Profile
                </Typography>
                <Typography color="text.secondary">
                  User information and settings can go here.
                </Typography>
              </Grid>

              {/* Right Column (8/12 width) */}
              <Grid item xs={12} md={8}>
                <Stack 
                  sx={{ height: '100%' }} 
                 
                >
                  <Box sx={{ p: { xs: 2, md: 3 } }}>
                    <Typography variant="h6" gutterBottom>
                      Available Quizzes
                    </Typography>
                    <Typography color="text.secondary">
                      A list of quizzes or assessments can be displayed here.
                    </Typography>
                    <MainChat />
                  </Box>
                  <Box sx={{ p: { xs: 2, md: 3 } }}>
                    <Typography variant="h6" gutterBottom>
                      Recent Activity
                    </Typography>
                    <Typography color="text.secondary">
                      Recent scores and completed quizzes can be shown here.
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>
    </Layout>
  );
};

export default Dashboard;

