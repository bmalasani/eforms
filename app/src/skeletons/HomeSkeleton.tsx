import { Box } from '../components/Box';

function HomeSkeleton() {
  return (
    <Box
      gradient='info'
      sx={{
        width: '100vw',
        height: '100vh',
      }}
    >
    </Box>
  );
}

export default HomeSkeleton;
