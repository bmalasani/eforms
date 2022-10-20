import React from 'react';
import { IRoutes } from '../../types';
import { Link } from 'react-router-dom';
import { useEformsContext } from '../../store';
import ThemeModeToggle from './ThemeModeToggle';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { Box } from '../Box';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import NavSearch from './NavSearch';

export interface NavBarProps {
  routes?: IRoutes;
  Logo: any;
  user: any;
  [k: string]: any;
}

function NavBar({ routes = [], Logo, user, ...rest }: NavBarProps) {
  const [state, dispatch] = useEformsContext();
  const setTheme = (checked: boolean) =>
    dispatch({ type: 'SET_THEME', payload: checked ? 'dark' : 'light' });

  return (
    <AppBar component="header" {...rest}>
      <Toolbar role={'navigation'} component={Container}>
        <Box component={Link} to="/" aria-label="Go to homepage" sx={{ lineHeight: 0, mr: 2 }}>
          <Logo width={30} />
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'center',
            justifyItems: 'center',
            alignItems: 'center',
          }}
        >
          <NavSearch />
        </Box>
        <Stack direction="row" spacing={1}>
          <ThemeModeToggle checked={state.theme === 'dark'} onChange={setTheme} />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
