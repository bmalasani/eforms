import { IRoutes } from '../../types';
import { Link } from 'react-router-dom';
import { useEformsContext } from '../../store';
import ThemeModeToggle from './ThemeModeToggle';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { Box } from '../Box';
import Stack from '@mui/material/Stack';
import NavSearch from './NavSearch';
import UserMenu from './UserMenu';
import NavRequestMenu from './NavRequestMenu';
import { Typography } from '../Typography';
import NavBarDropMenu from './NavBarDropMenu';
import IconButton from '@mui/material/IconButton';
import { Badge } from '../Badge';
import { Avatar } from '../Avatar';
import { Article } from '@mui/icons-material';

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
        <Box
          component={Link}
          to={'/'}
          aria-label="Go to homepage"
          sx={{ lineHeight: 0, mr: 2, display: 'flex', gap: 2, textDecoration: 'none' }}
        >
          <IconButton aria-label="New Request" sx={{ display: { xs: 'none', md: 'initial' } }}>
            <Avatar gradient="warning" shadow="warning">
              <Article />
            </Avatar>
          </IconButton>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: 'none', md: 'flex' },
            justifyContent: 'center',
            justifyItems: 'center',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <NavSearch />
          <NavRequestMenu />
        </Box>
        <Stack direction="row" spacing={1}>
          <ThemeModeToggle checked={state.theme === 'dark'} onChange={setTheme} />
          <UserMenu name={'Nani Malasani'} />
          <NavBarDropMenu />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
