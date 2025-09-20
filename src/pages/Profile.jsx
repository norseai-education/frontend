<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Box, Avatar, Grid, Divider, Alert, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Layout from '../components/Layout';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from '../components/LoginButton';
import Loading from './Loading';
=======
import React, { useState, useEffect, Suspense } from 'react';
import { Container, Typography, Paper, Box, Avatar, Grid, Divider, Alert, CircularProgress, Skeleton } from '@mui/material';
import Layout from '../components/Layout';
// import Assessment from '../components/assessment/Assessment';
>>>>>>> temp-assessment-branch

// --- Sub-components for better structure ---

const ProfileHeader = ({ user }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
    <Avatar
      src={user.avatar}
      alt={`${user.name}'s avatar`}
      sx={{ width: 120, height: 120, mb: 2, border: '3px solid', borderColor: 'primary.main' }}
    />
    <Typography variant="h4" component="h1" fontWeight="bold" sx={{ color: 'text.primary' }}>
      {user.name}
    </Typography>
    <Typography variant="body1" color="text.secondary">
      {user.email}
    </Typography>
  </Box>
);

const ProfileDetails = ({ user }) => (
  <Grid container spacing={3} sx={{ textAlign: 'left', width: '100%' }}>
    <Grid item xs={12}>
      <Typography variant="h6" gutterBottom sx={{ color: 'text.primary' }}>
        About Me
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
        {user.bio}
      </Typography>
    </Grid>
    <Grid item xs={12}>
      <Typography variant="h6" gutterBottom sx={{ color: 'text.primary' }}>
        Account Details
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
        Member Since: {user.memberSince}
      </Typography>
    </Grid>
  </Grid>
);

const ProfileSkeleton = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <Skeleton variant="circular" width={120} height={120} sx={{ mb: 2 }} />
    <Skeleton variant="text" width="40%" height={48} />
    <Skeleton variant="text" width="60%" height={24} sx={{ mb: 3 }} />
    <Divider sx={{ width: '100%', mb: 3 }} />
    <Skeleton variant="text" width="100%" height={40} />
    <Skeleton variant="rectangular" width="100%" height={100} />
  </Box>
);


// --- Main Profile Component ---

const Profile = () => {
<<<<<<< HEAD
  const { isAuthenticated, isLoading, user: auth0User } = useAuth0();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (auth0User) {
      // Use Auth0 user info for name and email
      setUser({
        name: auth0User.name || auth0User.nickname || auth0User.email,
        email: auth0User.email,
        avatar: auth0User.picture,
        bio: 'Welcome to your NorseAI profile!',
        memberSince: auth0User.updated_at ? new Date(auth0User.updated_at).toLocaleDateString() : '',
      });
      setLoading(false);
      setError(null);
    }
  }, [auth0User]);

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return (
      <Layout>
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            You must be signed in to view your profile.
          </Typography>
          <LoginButton />
        </Box>
      </Layout>
    );
  }
=======
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate fetching user data from an API
    const fetchUserData = () => {
      setLoading(true);
      setTimeout(() => {
        try {
          // Dummy user data, simulating a successful API response
          const dummyUser = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            avatar: '/static/images/avatar/1.jpg',
            bio: 'Software developer and AI enthusiast. Passionate about creating innovative solutions.',
            memberSince: 'January 2023',
          };
          setUser(dummyUser);
          setError(null);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
          setError('Failed to fetch user profile. Please try again later.');
        } finally {
          setLoading(false);
        }
      }, 1500); // Simulate a 1.5-second network delay
    };

    fetchUserData();
  }, []);
>>>>>>> temp-assessment-branch

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {loading && <ProfileSkeleton />}
          {error && <Alert severity="error" sx={{ width: '100%' }}>{error}</Alert>}
          {!loading && !error && user && (
            <>
              <ProfileHeader user={user} />
              <Divider sx={{ width: '100%', mb: 3 }} />
<<<<<<< HEAD
              <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                      <Tab label="Profile" value="1" />
                      <Tab label="Assessments" value="2" />
                      <Tab label="Settings" value="3" />
                    </TabList>
                  </Box>
                  <TabPanel value="1"><ProfileDetails user={user} /></TabPanel>
                  <TabPanel value="2">Item Two</TabPanel>
                  <TabPanel value="3">Item Three</TabPanel>
                </TabContext>
              </Box>
            </>
          )}
        </Paper>
        
      </Container>
      
 
=======
              <ProfileDetails user={user} />
            </>
          )}
        </Paper>
      </Container>

      {/* <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', mb: 2, color: 'text.primary' }}>
          My Assessment
        </Typography>
        <Suspense fallback={
          <Container maxWidth="md" sx={{ mt: 2 }}>
            <Alert severity="info">
              Loading assessment... If the server is unavailable, this may take a moment to resolve.
            </Alert>
          </Container>
        }>
          <Assessment />
        </Suspense>
      </Box> */}
>>>>>>> temp-assessment-branch
    </Layout>
  );
};

export default Profile;
