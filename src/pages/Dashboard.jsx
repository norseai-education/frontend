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
import CSAssessment from './CSAssessment';
import ChatIntroduction from './Chat_introduction';
import DashboardDisplay from '../components/dashboard/DashboardDisplay';


/**
 * The main dashboard page with a two-column layout (4/8 split).
 */
const Dashboard = () => {
  return (
    <Layout>
      <DashboardDisplay />
    </Layout>
  );
};

export default Dashboard;

