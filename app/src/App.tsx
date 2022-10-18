import React, { Suspense } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Await, Outlet, useLoaderData } from 'react-router-dom';
import { Box, BrandProvider, Footer, NavBar } from './components';
import SvgMuiLogo from './icons/SvgMuiLogo';
import { HomeSkeleton } from './skeletons';
import { EFormsProvider } from './store';

function App() {
  const { user }: any = useLoaderData();
  return (
    <EFormsProvider>
      <BrandProvider>
        <CssBaseline />
        <Suspense fallback={<HomeSkeleton />}>
          <Await resolve={user}>
            <NavBar Logo={SvgMuiLogo} user={user} />
            <Box component="main" role="main">
              <Outlet />
            </Box>
            <Footer />
          </Await>
        </Suspense>
      </BrandProvider>
    </EFormsProvider>
  );
}

export default App;
