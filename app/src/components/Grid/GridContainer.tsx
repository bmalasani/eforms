import Grid2, { Grid2Props } from '@mui/material/Unstable_Grid2';

function GridContainer({ children, ...rest }: Grid2Props) {
  return (
    <Grid2 {...rest} container>
      {children}
    </Grid2>
  );
}

export default GridContainer;
