import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

function FormSkeleton() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Skeleton sx={{ height: '5rem' }} animation="wave"></Skeleton>
      </Grid>
      <Grid item xs={12}>
        <Skeleton sx={{ height: '5rem' }} animation="wave"></Skeleton>
      </Grid>
      <Grid item xs={12}>
        <Skeleton sx={{ height: '5rem' }} animation="wave"></Skeleton>
      </Grid>
      <Grid item xs={12}>
        <Skeleton sx={{ height: '5rem' }} animation="wave"></Skeleton>
      </Grid>
      <Grid item xs={12}>
        <Skeleton sx={{ height: '5rem' }} animation="wave"></Skeleton>
      </Grid>
      <Grid item xs={12}>
        <Skeleton sx={{ height: '5rem' }} animation="wave"></Skeleton>
      </Grid>
    </Grid>
  );
}

export default FormSkeleton;
