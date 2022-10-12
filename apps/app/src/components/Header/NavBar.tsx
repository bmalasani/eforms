import React from 'react';
import { AppBar, Box, Container, Stack, Toolbar } from '@mui/material';
import { IRoutes } from '../../types';
import { Link } from 'react-router-dom';
import NavSearch from './NavSearch';
import { useEformsContext } from '../../store';
import ThemeModeToggle from './ThemeModeToggle';
import NavBarMenu from './NavBarMenu2';

export interface NavBarProps {
  routes?: IRoutes;
  Logo: any;
}

function NavBar({ routes = [], Logo }: NavBarProps) {
  const [state, dispatch] = useEformsContext();
  const setTheme = (checked: boolean) =>
    dispatch({ type: 'SET_THEME', payload: checked ? 'dark' : 'light' });

  return (
    <AppBar component="header">
      <Toolbar component={Container}>
        <Box component={Link} to="/" aria-label="Go to homepage" sx={{ lineHeight: 0, mr: 2 }}>
          <Logo width={30} />
        </Box>
        <Box component={NavSearch}></Box>
        <Box sx={{ flexGrow: 1 }} />
        <NavBarMenu />
        <Stack direction="row" spacing={1}>
          <ThemeModeToggle checked={state.theme === 'dark'} onChange={setTheme} />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
