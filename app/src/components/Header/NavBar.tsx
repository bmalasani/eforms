import React from 'react';
import { AppBar, Box, Container, Stack, Toolbar } from '@mui/material';
import { IRoutes } from '../../types';
import { Link } from 'react-router-dom';
import { useEformsContext } from '../../store';
import ThemeModeToggle from './ThemeModeToggle';

export interface NavBarProps {
  routes?: IRoutes;
  Logo: any;
  [k: string]: any;
}

function NavBar({ routes = [], Logo, ...rest }: NavBarProps) {
  const [state, dispatch] = useEformsContext();
  const setTheme = (checked: boolean) =>
    dispatch({ type: 'SET_THEME', payload: checked ? 'dark' : 'light' });

  return (
    <AppBar component="header" {...rest}>
      <Toolbar role={"navigation"} component={Container}>
        <Box component={Link} to="/" aria-label="Go to homepage" sx={{ lineHeight: 0, mr: 2 }}>
          <Logo width={30} />
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" spacing={1}>
          <ThemeModeToggle checked={state.theme === 'dark'} onChange={setTheme} />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
