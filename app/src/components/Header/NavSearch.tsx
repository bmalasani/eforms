import React from 'react';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { useShortCut } from '../../hooks/useShortcut';
import { Search } from '@mui/icons-material';
import { SearchButton, SearchLabel, ShortcutLabel } from './NavRequestMenu';

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 1),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const NavSearch = () => {
  const searchButtonRef = React.useRef<any>(null);

  const [isOpen, setIsOpen] = React.useState(false);

  const search = `Search…`;
  const macOS = window.navigator.platform.toUpperCase().indexOf('MAC') >= 0;

  const onOpen = React.useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  useShortCut('k', () => setIsOpen(true));

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
        {!isOpen ? (
          <SearchLabel>{search}</SearchLabel>
        ) : (
          <StyledInputBase
            autoFocus
            onBlur={() => setIsOpen(false)}
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        )}
        <ShortcutLabel>{macOS ? '⌘' : 'Ctrl+'}K</ShortcutLabel>
      </SearchButton>
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

export default NavSearch;
