import { AppFooter, AppHeader, BrandingProvider } from '@meb/components';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';

function App() {
  return (
    <BrandingProvider mode="light">
      <CssBaseline />
      <AppHeader />
      <Box>
        

      </Box>
      <AppFooter />
    </BrandingProvider>
  );
}

export default App;
