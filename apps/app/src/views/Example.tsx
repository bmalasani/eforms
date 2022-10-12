import { LightTwoTone } from '@mui/icons-material';
import { AppBar, Box, Container, IconButton, Toolbar, Typography } from '@mui/material';
import React from 'react';
import NavBar from '../components/Header/NavBar';
import { useEformsContext } from '../store';

type Props = {};

function Example({}: Props) {
  const [state, dispatch] = useEformsContext();
  return (
    <React.Fragment>
      <NavBar>
        <Toolbar>
          <Typography variant="h2">Example NavBar</Typography>
          <IconButton
            onClick={() =>
              dispatch({ type: 'SET_THEME', payload: state.theme === 'light' ? 'dark' : 'light' })
            }
          >
            <LightTwoTone></LightTwoTone>
          </IconButton>
        </Toolbar>
      </NavBar>
      <Container maxWidth="lg">
        <Box sx={{ height: '100vh' }}>
          <Typography variant="h1">Test</Typography>
          <Typography variant="body1">
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum “”’
          </Typography>
          <Typography variant="body1">
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum “”’
          </Typography>
          <Typography variant="body1">
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum “”’
          </Typography>
          <Typography variant="body1">
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum
            Lorem Epsum Lorem Epsum “”’
          </Typography>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default Example;
