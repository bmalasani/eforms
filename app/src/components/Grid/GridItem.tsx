import Grid2, { Grid2Props } from '@mui/material/Unstable_Grid2';

function GridItem({ children, ...rest }: Grid2Props) {
  return (
    <Grid2
      sm={parseInt(rest.sm as string) || 'auto'}
      md={parseInt(rest.md as string) || 'auto'}
      lg={parseInt(rest.lg as string) || 'auto'}
      xl={parseInt(rest.xl as string) || 'auto'}
    >
      {children}
    </Grid2>
  );
}

export default GridItem;
