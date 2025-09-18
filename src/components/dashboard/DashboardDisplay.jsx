import * as React from 'react';
import { Grid, Card, CardContent, Typography, CardActions, Button, Box, Divider } from '@mui/material';
import { Link } from 'react-router-dom';

const cardData = [
  { title: 'Math 101 Assessments', content: 'View and manage student assessments.', path: '/math-assessment' },
  { title: 'CS Assessments', content: 'Manage user accounts and roles.', path: '/cs-assessment' },
  { title: 'Analytics Assessments', content: 'Visualize platform usage and statistics.', path: '/analytics-assessment' },
  { title: 'Geometry Assessments', content: 'Create and edit educational content.', path: '/geometry-assessment' },
  { title: 'Machine Assessments', content: 'Configure application settings.', path: '/machine-learning-assessment' },
  { title: 'Deep Learning Assessments', content: 'Generate and view reports.', path: '/deep-learning-assessment' },
  { title: 'Chat', content: 'Monitor and manage chat interactions.', path: '/chat' },
  { title: 'System Health', content: 'Check the status of system services.', path: '/admin' },
];

const DashboardDisplay = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={4}>
        {cardData.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ minWidth: 300, height: 350, display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="div">
                  {card.title}
                </Typography>
                <Typography sx={{ mt: 1.5 }} color="text.secondary">
                  {card.content}
                </Typography>
              </CardContent>
              <Divider />
              <CardActions>
                <Button size="small" component={Link} to={card.path}>Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DashboardDisplay;
