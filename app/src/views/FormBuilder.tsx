import React from 'react';
import { AppBar, Box, Divider, Drawer, Grid, Icon, Stack, Tab, Tabs } from '@mui/material';
import Footer from '../components/Footer/Footer';
import NavBar from '../components/Header/NavBar';
import SvgMuiLogo from '../icons/SvgMuiLogo';

type Props = {};
function FormBuilder({}: Props) {
  return (
    <Box sx={{ display: 'flex' }}>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <NavBar Logo={SvgMuiLogo} />
        <Footer />
      </Box>
      <Drawer variant="permanent" anchor="right">
        <AppBar position="static">
          <Tabs orientation="horizontal">
            <Tab
              label="App"
              icon={
                <Icon fontSize="small" sx={{ mt: -0.25 }}>
                  home
                </Icon>
              }
            />
            <Tab
              label="Message"
              icon={
                <Icon fontSize="small" sx={{ mt: -0.25 }}>
                  email
                </Icon>
              }
            />
            <Tab
              label="Settings"
              icon={
                <Icon fontSize="small" sx={{ mt: -0.25 }}>
                  settings
                </Icon>
              }
            />
          </Tabs>
        </AppBar>
        <Box></Box>
        <Divider/>
        <Footer />
      </Drawer>
    </Box>
  );
}

export default FormBuilder;
