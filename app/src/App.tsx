import { Box, CssBaseline } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { BrandProvider, Footer, NavBar } from './components';
import SvgMuiLogo from './icons/SvgMuiLogo';
import { EFormsProvider } from './store';

function App() {
  return (
    <EFormsProvider>
      <BrandProvider>
        <CssBaseline />
        <NavBar Logo={SvgMuiLogo} />
        <Box
          component="main"
          role="main"
        >
          <Outlet />
        </Box>
        <Footer />
      </BrandProvider>
    </EFormsProvider>
  );
}

export default App;
