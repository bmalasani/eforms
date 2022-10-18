import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

function StatsSkeleton() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={3}>
        <Skeleton sx={{ height: '12rem' }} animation="wave"></Skeleton>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Skeleton sx={{ height: '12rem' }} animation="wave"></Skeleton>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Skeleton sx={{ height: '12rem' }} animation="wave"></Skeleton>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Skeleton sx={{ height: '12rem' }} animation="wave"></Skeleton>
      </Grid>
    </Grid>
  );
}

export default StatsSkeleton;
