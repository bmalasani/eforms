import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Logout, Person, Settings } from '@mui/icons-material';
import Menu from '@mui/material/Menu';
import { useRef, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { Avatar } from '../Avatar';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Box } from '../Box';

export default function UserMenu({ name }: any) {
  const anchorEl = useRef<any>(null);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  return (
    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
      <Tooltip title={name}>
        <IconButton ref={anchorEl} color="primary" size="small" onClick={() => setOpen(true)}>
          <Person />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl.current}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Avatar /> Profile
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
}
