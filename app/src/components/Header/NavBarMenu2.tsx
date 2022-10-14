import {
  Box,
  Icon,
  Popper,
  Link as MuiLink,
  Typography,
  Grow,
  Grid,
  Paper,
  Fade,
  debounce,
} from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import React, { Fragment, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { IRoute, IRoutes } from '../../types';

const Navigation = styled('nav')(({ theme }) => ({
  '& ul': {
    padding: 0,
    margin: 0,
    listStyle: 'none',
    display: 'flex',
  },
  '& li': {
    color: theme.palette.text.primary,
    ...theme.typography.body2,
    fontWeight: theme.typography.fontWeightBold,
    '& > a, & > div': {
      display: 'inline-block',
      color: 'inherit',
      textDecoration: 'none',
      padding: theme.spacing(1),
      borderRadius: theme.shape.borderRadius,
      '&:hover, &:focus': {
        backgroundColor:
          theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.grey[50],
        color: theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.grey[700],
        '@media (hover: none)': {
          backgroundColor: 'initial',
        },
      },
    },
    '& > div': {
      cursor: 'default',
    },
  },
}));

type NavBarMenuItemProps = {
  route: IRoute;
  [key: string]: any;
};

function NavBarMenuItem({ route, onEnter, onLeave, key }: NavBarMenuItemProps) {
  return (
    <li
      role="none"
      {...(route!.isDropDown && route.routes && route.routes.length > 0
        ? {
            onMouseEnter: (evt) => onEnter(evt.currentTarget, route),
            onFocus: (evt) => onEnter(evt.currentTarget, route),
            onMouseLeave: () => onLeave(null),
            onBlur: () => onLeave(null),
          }
        : {})}
    >
      <div
        role="menuitem"
        tabIndex={key}
        id={`menuid_${route!.id}`}
        {...(route!.isDropDown && route.routes && route.routes.length > 0
          ? {
              'aria-haspopup': true,
              'aria-expanded': true,
            }
          : {})}
      >
        {route.description ? (
          <Box>
            {route.icon && <Icon>{route.icon}</Icon>}
            {route!.label}
            <Typography
              display="block"
              variant="button"
              color="text"
              fontWeight="regular"
              sx={{ transition: 'all 300ms linear' }}
            >
              {route!.description}
            </Typography>
          </Box>
        ) : (
          route.label
        )}
        {(route.isDropDown || route.isFormMenu) && route.routes && route.routes.length > 0 && (
          <Icon fontSize="small" sx={{ fontWeight: 'normal', verticalAlign: 'middle', mr: -0.5 }}>
            arrow_drop_down
          </Icon>
        )}
      </div>
    </li>
  );
}

const NavBarSubMenu = React.forwardRef<unknown, { route: IRoute }>(function NavBarSubMenu(
  { route, ...props },
  ref
) {
  return (
    <Box
      component={Link}
      ref={ref}
      sx={{
        display: 'flex',
        alignItems: 'center',
        py: 2,
        pr: 3,
        '&:hover, &:focus': {
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark'
              ? alpha(theme.palette.primary.main, 0.4)
              : theme.palette.grey[50],
          outline: 'none',
          '@media (hover: none)': {
            backgroundColor: 'initial',
            outline: 'initial',
          },
        },
      }}
      {...props}
    >
      <Box
        sx={{
          px: 2,
          '& circle': {
            fill: (theme) =>
              theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.grey[100],
          },
        }}
      >
        {route.icon && <Icon>{route.icon}</Icon>}
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Typography color="text.primary" variant="body2" fontWeight="bold">
          {route.label}
        </Typography>
        {route.description && (
          <Typography color="text.secondary" variant="body2">
            {route.description}
          </Typography>
        )}
      </Box>
    </Box>
  );
});

function NavBarFormDropMenu({ route, onEnter, onLeave }: { route: IRoute; [k: string]: any }) {
  const [subRoute, setSubRoute] = useState(route.routes![0]);
  return (
    <Grid container minWidth={'400px'} spacing={3} py={1} px={1.5}>
      <Grid item xs={4} sx={{ position: 'relative' }}>
        {route.routes?.map((x) => (
          <NavBarMenuItem key={x.id} route={x} onEnter={(x: any, r: IRoute) => setSubRoute(r)} />
        ))}
      </Grid>
      <Grid item xs={8} sx={{ position: 'relative' }}>
        {subRoute.routes?.map((x) => (
          <NavBarMenuItem key={x.id} route={x} />
        ))}
      </Grid>
    </Grid>
  );
}

function NavBarMenu() {
  let routes1: IRoutes = [
    {
      id: 'r0',
      label: 'Group0',
      route: '',
      isFormMenu: true,
      isDropDown: true,
      routes: [
        {
          id: 'r01',
          label: 'Group-r6',
          route: '',
          isDropDown: true,
          routes: [
            {
              id: 'r01',
              label: 'Group-r6',
              route: '',
            },
            {
              id: 'r02',
              label: 'Group-r3',
              route: '',
            },
            {
              id: 'r03',
              label: 'Group-r4',
              route: '',
            },
          ],
        },
        {
          id: 'r02',
          label: 'Group-r3',
          route: '',
          isDropDown: true,
          routes: [
            {
              id: 'r01',
              label: 'Group-r6',
              route: '',
            },
            {
              id: 'r02',
              label: 'Group-r3',
              route: '',
            },
            {
              id: 'r03',
              label: 'Group-r4',
              route: '',
            },
          ],
        },
        {
          id: 'r03',
          label: 'Group-r4',
          route: '',
          isDropDown: true,
          routes: [
            {
              id: 'r01',
              label: 'Group-r6',
              route: '',
            },
            {
              id: 'r02',
              label: 'Group-r3',
              route: '',
            },
            {
              id: 'r03',
              label: 'Group-r4',
              route: '',
            },
          ],
        },
      ],
    },
    {
      id: 'r1',
      label: 'Group-r3',
      route: '',
      isDropDown: true,
      routes: [
        {
          id: '10',
          label: 'Group-rr1',
          route: '',
        },
        {
          id: '11',
          label: 'Group0rrr',
          route: '',
        },
        {
          id: '12',
          label: 'Group-ff1',
          route: '',
        },
      ],
    },
    {
      id: 'rd3',
      label: 'sdkfhkdsfh',
    },
  ];

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [dropDownEl, setDropDownEl] = React.useState<null | HTMLElement>(null);
  const [route, setRoute] = useState<IRoute | null>(null);

  const renderRoutes = routes1.map((r, ind) => (
    <NavBarMenuItem
      route={r}
      key={ind}
      onEnter={(currentTarget: any, selectedRoute: any) => {
        setAnchorEl(currentTarget);
        setDropDownEl(currentTarget);
        setRoute(selectedRoute);
      }}
      onLeave={() => setAnchorEl(null)}
    />
  ));

  const dropdownMenu = (
    <Popper
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      transition
      placement="bottom-start"
      onMouseEnter={() => {
        setAnchorEl(dropDownEl);
      }}
      onMouseLeave={() => setAnchorEl(null)}
      style={{
        zIndex: 1200,
        pointerEvents: Boolean(anchorEl) ? undefined : 'none',
      }}
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={50}>
          <Paper
            variant="outlined"
            sx={(theme) => ({
              minWidth: 298,
              overflow: 'hidden',
              borderColor: theme.palette.mode === 'dark' ? 'primaryDark.700' : 'grey.200',
              bgcolor: theme.palette.mode === 'dark' ? 'primaryDark.900' : 'background.paper',
              boxShadow: `0px 4px 20px ${
                theme.palette.mode === 'dark'
                  ? alpha(theme.palette.background.paper, 0.72)
                  : 'rgba(170, 180, 190, 0.3)'
              }`,
              '& ul': {
                margin: 0,
                padding: 0,
                listStyle: 'none',
              },
              '& li:not(:last-of-type)': {
                borderBottom: '1px solid',
                borderColor: theme.palette.mode === 'dark' ? 'primaryDark.700' : 'grey.100',
              },
              '& a': { textDecoration: 'none' },
            })}
          >
            <ul role="menu">
              {route &&
                route.routes &&
                route.routes!.map((r, ind) => <NavBarSubMenu route={r} key={ind} />)}
            </ul>
          </Paper>
        </Fade>
      )}
    </Popper>
  );

  return (
    <Navigation>
      <ul role={'menubar'}>{renderRoutes}</ul>
      {anchorEl && dropdownMenu}
    </Navigation>
  );
}

export default NavBarMenu;
