import { Search, SearchSharp } from '@mui/icons-material';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import { alpha, styled } from '@mui/material/styles';
import React from 'react';
import { Box } from '../Box';
import InputBase from '@mui/material/InputBase';
import Popover from '@mui/material/Popover';

const SearchDiv = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.grey[300], 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.grey[600], 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const SearchButton = styled('button')(({ theme }) => {
  return {
    minHeight: 34,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    [theme.breakpoints.only('xs')]: {
      backgroundColor: 'transparent',
      padding: 0,
      minWidth: 34,
      justifyContent: 'center',
      '& > *:not(.MuiSvgIcon-root)': {
        display: 'none',
      },
    },
    [theme.breakpoints.up('sm')]: {
      minWidth: 200,
    },
    fontFamily: theme.typography.fontFamily,
    position: 'relative',
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    color: theme.palette.text.secondary,
    fontSize: theme.typography.pxToRem(14),
    border: `1px solid ${
      theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[200]
    }`,
    borderRadius: 10,
    cursor: 'pointer',
    transitionProperty: 'all',
    transitionDuration: '150ms',
    '&:hover': {
      background:
        theme.palette.mode === 'dark'
          ? alpha(theme.palette.grey[700], 0.4)
          : alpha(theme.palette.grey[100], 0.7),
      borderColor:
        theme.palette.mode === 'dark' ? theme.palette.grey[600] : theme.palette.grey[300],
    },
  };
});

const SearchLabel = styled('span')(({ theme }) => {
  return {
    marginLeft: theme.spacing(1),
    marginRight: 'auto',
  };
});

const Shortcut = styled('div')(({ theme }) => {
  return {
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 700,
    lineHeight: '20px',
    marginLeft: theme.spacing(0.5),
    border: `1px solid ${
      theme.palette.mode === 'dark' ? theme.palette.grey[500] : theme.palette.grey[200]
    }`,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#FFF',
    padding: theme.spacing(0, 0.8),
    borderRadius: 5,
  };
});

const NavSearch = () => {
  const searchButtonRef = React.useRef<any>(null);

  const [isOpen, setIsOpen] = React.useState(false);

  const search = `Search…`;
  const macOS = window.navigator.platform.toUpperCase().indexOf('MAC') >= 0;

  const onOpen = React.useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  return (
    <>
      <SearchButton ref={searchButtonRef} onClick={onOpen}>
        <Search
          fontSize="small"
          sx={{
            color: (theme) =>
              theme.palette.mode === 'dark' ? theme.palette.grey[300] : theme.palette.grey[500],
          }}
        />
        <SearchLabel>{search}</SearchLabel>
        <Shortcut>{macOS ? '⌘' : 'Ctrl+'}K</Shortcut>
      </SearchButton>
      <Popover
        PaperProps={{
          sx: {
            borderRadius: 4,
            mx: -3,
            my: -2,
          },
        }}
        open={isOpen}
        anchorEl={searchButtonRef.current}
        onClose={() => setIsOpen(false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Box sx={{ p: { md: 3 }, height: '400px' }}>
          <SearchDiv>
            <SearchIconWrapper>
              <SearchSharp />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
          </SearchDiv>
        </Box>
      </Popover>
      {/* <Popper
        sx={{ zIndex: 10000 }}
        anchorEl={searchButtonRef.current}
        keepMounted
        open={isOpen}
        placement="top"
        onMouseLeave={() => setIsOpen(false)}
        transition
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper
              sx={{ position: 'relative', mt: -5, width: { md: '400px', lg: '600px' } }}
              elevation={10}
            >
              <Box sx={{  p: { md: 3}, height: '400px' }}>
                <SearchDiv>
                  <SearchIconWrapper>
                    <SearchSharp />
                  </SearchIconWrapper>
                  <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
                </SearchDiv>
              </Box>
            </Paper>
          </Grow>
        )}
      </Popper> */}
    </>
  );
};

export default NavSearch;
