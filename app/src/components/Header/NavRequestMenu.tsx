import React from 'react';
import FormsDailog from '../Dialog/FormsDailog';
import { alpha, styled } from '@mui/material/styles';
import { useShortCut } from '../../hooks/useShortcut';
import { CreateNewFolder } from '@mui/icons-material';

export const SearchButton = styled('button')(({ theme }) => {
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

export const SearchLabel = styled('span')(({ theme }) => {
  return {
    marginLeft: theme.spacing(1),
    marginRight: 'auto',
  };
});

export const ShortcutLabel = styled('div')(({ theme }) => {
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

const NavRequestMenu = () => {
  const searchButtonRef = React.useRef<any>(null);

  const [isOpen, setIsOpen] = React.useState(false);

  const search = `New Request`;
  const macOS = window.navigator.platform.toUpperCase().indexOf('MAC') >= 0;

  const onOpen = React.useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  useShortCut('h', () => setIsOpen(true));

  return (
    <>
      <SearchButton ref={searchButtonRef} onClick={onOpen}>
        <CreateNewFolder
          fontSize="small"
          sx={{
            color: (theme) =>
              theme.palette.mode === 'dark' ? theme.palette.grey[300] : theme.palette.grey[500],
          }}
        />
        <SearchLabel>{search}</SearchLabel>
        <ShortcutLabel>{'Ctrl+'}H</ShortcutLabel>
      </SearchButton>
      <FormsDailog open={isOpen} handleClose={() => setIsOpen(false)} />
      {/* <Popover
        PaperProps={{
          sx: {
            borderRadius: 4,
          },
        }}
        open={isOpen}
        anchorEl={searchButtonRef.current}
        onClose={() => setIsOpen(false)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box sx={{ p: { md: 3 }, height: '400px' }}>
          <SearchButton>
            <Search
              fontSize="small"
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'dark' ? theme.palette.grey[300] : theme.palette.grey[500],
              }}
            />
            <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />

            <Shortcut>{macOS ? '⌘' : 'Ctrl+'}K</Shortcut>
          </SearchButton>
        </Box>
      </Popover> */}
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

export default NavRequestMenu;
