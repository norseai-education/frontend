import * as React from 'react';
import { Grid, Skeleton, Card, CardContent, Box } from '@mui/material';

const DashboardSkeleton = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={4}>
        {Array.from(new Array(8)).map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ minWidth: 300, height: 350 }}>
              <CardContent>
                <Skeleton variant="text" width="60%" height={40} />
                <Skeleton variant="text" />
                <Skeleton variant="text" />
              </CardContent>
              <Skeleton variant="rectangular" height={48} sx={{ mt: 'auto' }} />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DashboardSkeleton;
