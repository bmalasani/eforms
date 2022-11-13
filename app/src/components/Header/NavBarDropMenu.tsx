import { Assessment, ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import SvgHamburgerMenu from '../../icons/SvgHamburgerMenu';
import { IRoutes } from '../../types';
import { Box } from '../Box';

export interface NavBarDropMenuProps {
  routes?: IRoutes;
  onSearch?: Function;
}

function NavBarDropMenu({ routes = [], onSearch }: NavBarDropMenuProps) {
  const [open, setOpen] = React.useState(false);
  const [collapse, setCollapse] = React.useState<String | null>(null);
  const hambugerRef = React.useRef<HTMLButtonElement | null>(null);
  const formGroups = ['General', 'IT Forms', 'Finance', 'Workforce'];
  const forms = ['Key Requisation', 'IT Access', 'IT ChangeRequest', 'Change of Status'];

  const handleGroupClick = (group: string) => () => setCollapse(group);

  return (
    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
      <IconButton
        color="primary"
        aria-label="Menu"
        ref={hambugerRef}
        disableRipple
        onClick={() => setOpen((value) => !value)}
        sx={{
          position: 'relative',
          '& rect': {
            transformOrigin: 'center',
            transition: '0.2s',
          },
          ...(open && {
            '& rect:first-of-type': {
              transform: 'translate(1.5px, 1.6px) rotateZ(-45deg)',
            },
            '& rect:last-of-type': {
              transform: 'translate(1.5px, -1.2px) rotateZ(45deg)',
            },
          }),
        }}
      >
        <SvgHamburgerMenu />
      </IconButton>
      <ClickAwayListener
        onClickAway={(event) => {
          if (hambugerRef.current && !hambugerRef.current.contains(event.target as Node)) {
            setOpen(false);
          }
        }}
      >
        <Collapse
          in={open}
          sx={{
            position: 'fixed',
            top: 70,
            left: 0,
            right: 0,
            mx: 1.5,
            bgcolor: 'background.paper',
          }}
        >
          <Box
            shadow="info"
            radius="lg"
            sx={{
              p: 2,
              bgcolor: 'background.paper',
              height: 'calc(100vh - 100px)',
              overflow: 'auto',
            }}
          >
            <List sx={{ bgcolor: 'background.paper' }} component="nav">
              {formGroups.map((group, index) => (
                <React.Fragment key={group}>
                  <ListItemButton key={group} onClick={handleGroupClick(group)}>
                    <ListItemIcon>
                      <Assessment />
                    </ListItemIcon>
                    <ListItemText primary={group} />
                    {group === collapse ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={group === collapse} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {forms.map((form) => (
                        <ListItemButton key={form} sx={{ pl: 4 }}>
                          <ListItemIcon>
                            <StarBorder />
                          </ListItemIcon>
                          <ListItemText primary={form} />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                </React.Fragment>
              ))}
            </List>
          </Box>
        </Collapse>
      </ClickAwayListener>
    </Box>
  );
}

export default NavBarDropMenu;
