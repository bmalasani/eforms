import CssBaseline from '@mui/material/CssBaseline';
import { BrandingProvider } from './components';
import HomeLayout from './views/HomeLayout';

function App() {
  return (
    <BrandingProvider mode="light">
      <CssBaseline />
      <HomeLayout />
    </BrandingProvider>
  );
}

export default App;
