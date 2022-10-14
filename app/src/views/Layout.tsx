import { Box } from '@mui/system';
import React from 'react';
import Footer from '../components/Footer/Footer';
import NavBar from '../components/Header/NavBar';
import SvgMuiLogo from '../icons/SvgMuiLogo';

function Layout({ children }: any) {
  return (
    <Box sx={{ display: 'flex' }}>
      <NavBar Logo={SvgMuiLogo} />
      <Box component="main">{children}</Box>
      <Footer />
    </Box>
  );
}

export default Layout;
