import { Box, Icon, Popper, Link as MuiLink, Typography, Grow, Grid, Paper } from '@mui/material';
import { Fragment, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { IRoute, IRoutes } from '../../types';

type NavBarMenuItemProps = {
  route?: string;
  href?: string;
  label: string;
  isDropDown?: boolean;
  icon?: string;
  [key: string]: any;
};

const linkComponent = {
  component: MuiLink,
  target: '_blank',
  rel: 'noreferrer',
};

const routeComponent = {
  component: Link,
};

function NavBarMenuItem({ route, href, label, isDropDown, icon, ...rest }: NavBarMenuItemProps) {
  return (
    <>
      <Box
        role="menuitem"
        {...rest}
        sx={{ cursor: 'pointer', userSelect: 'none' }}
        {...(route && { ...routeComponent, to: route })}
        {...(href && { ...linkComponent, href })}
      >
        <Typography
          variant="body2"
          lineHeight={1}
          color="inherit"
          sx={{ alignSelf: 'center', '& *': { verticalAlign: 'middle' } }}
        >
          <Icon>article</Icon>
        </Typography>
        <Typography
          variant="button"
          fontWeight="regular"
          textTransform="capitalize"
          sx={{ fontWeight: '100%', ml: 1, mr: 0.25 }}
        >
          {label}
        </Typography>
        <Typography variant="body2" ml="auto">
          <Icon sx={{ fontWeight: 'normal', verticalAlign: 'middle' }}>
            {isDropDown && 'keyboard_arrow_down'}
          </Icon>
        </Typography>
      </Box>
    </>
  );
}

function NavBarSubMenuItem({ route, onEnter, onLeave }: { route: IRoute; [k: string]: any }) {
  return (
    <Typography
      {...(route.route && { ...routeComponent, to: route })}
      {...(route.href && { ...linkComponent, href: route.href })}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      variant="button"
      textTransform="capitalize"
      onMouseEnter={({ currentTarget }) => {
        if (route.isDropDown) {
          onEnter && onEnter(currentTarget, route);
        }
      }}
      onMouseLeave={() => {
        if (route.isDropDown) {
          onLeave && onLeave();
        }
      }}
    >
      {route.description ? (
        <Box>
          {route.label}
          <Typography
            display="block"
            variant="button"
            color="text"
            fontWeight="regular"
            sx={{ transition: 'all 300ms linear' }}
          >
            {route.description}
          </Typography>
        </Box>
      ) : (
        route.label
      )}
      {(route.isDropDown || route.isFormMenu) && (
        <Icon fontSize="small" sx={{ fontWeight: 'normal', verticalAlign: 'middle', mr: -0.5 }}>
          keyboard_arrow_right
        </Icon>
      )}
    </Typography>
  );
}

function NavBarFormDropMenu({ route, onEnter, onLeave }: { route: IRoute; [k: string]: any }) {
  const [subRoute, setSubRoute] = useState(route.routes![0]);
  return (
    <Grid container minWidth={'400px'} spacing={3} py={1} px={1.5}>
      <Grid item xs={4} sx={{ position: 'relative' }}>
        {route.routes?.map((x) => (
          <NavBarSubMenuItem key={x.id} route={x} onEnter={(x: any, r: IRoute) => setSubRoute(r)} />
        ))}
      </Grid>
      <Grid item xs={8} sx={{ position: 'relative' }}>
        {subRoute.routes?.map((x) => (
          <NavBarMenuItem {...x} />
        ))}
      </Grid>
    </Grid>
  );
}

function NavBarMenu() {
  let routes1: IRoutes = [
    {
      id: 'r0',
      label: 'Group-1',
      route: '',
      isFormMenu: true,
      isDropDown: true,
      routes: [
        {
          id: 'r01',
          label: 'Group-r1',
          route: '',
          routes: [
            {
              id: 'r01',
              label: 'Group-r1',
              route: '',
            },
            {
              id: 'r02',
              label: 'Group-r2',
              route: '',
            },
            {
              id: 'r03',
              label: 'Group-r3',
              route: '',
            },
          ],
        },
        {
          id: 'r02',
          label: 'Group-r2',
          route: '',
          routes: [
            {
              id: 'r01',
              label: 'Group-r1',
              route: '',
            },
            {
              id: 'r02',
              label: 'Group-r2',
              route: '',
            },
            {
              id: 'r03',
              label: 'Group-r3',
              route: '',
            },
          ],
        },
        {
          id: 'r03',
          label: 'Group-r3',
          route: '',
          routes: [
            {
              id: 'r01',
              label: 'Group-r1',
              route: '',
            },
            {
              id: 'r02',
              label: 'Group-r2',
              route: '',
            },
            {
              id: 'r03',
              label: 'Group-r3',
              route: '',
            },
          ],
        },
      ],
    },
    {
      id: 'r1',
      label: 'Group-r2',
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
          label: 'Group-1rrr',
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

  const [route, setRoute] = useState<IRoute | null>(null);
  const [dropdownEl, setDropdownEl] = useState<any>(null);
  const arrowRef = useRef<any>();
  const dropDownRef = useRef<any>();

  const renderRoutes = routes1.map((r) => {
    return (
      <NavBarMenuItem
        {...r}
        onMouseEnter={({ currentTarget }: any) => {
          if (r.isDropDown) {
            setDropdownEl(currentTarget);
            dropDownRef.current = currentTarget;
            setRoute(r);
          }
        }}
        onMouseLeave={() => r.isDropDown && setDropdownEl(null)}
      />
    );
  });

  const renderSubRoutes = useMemo(() => {
    if (route && route.routes && route.routes.length > 0) {
      return route.isFormMenu ? (
        <NavBarFormDropMenu route={route} />
      ) : (
        <Fragment>
          {route.routes?.map((x) => (
            <NavBarSubMenuItem key={x.id} route={x} />
          ))}
        </Fragment>
      );
    }
    return null;
  }, [route]);

  const dropdownMenu = (
    <Popper
      anchorEl={dropdownEl}
      popperRef={null}
      open={Boolean(dropdownEl)}
      placement="top-start"
      transition
      modifiers={[
        {
          name: 'arrow',
          enabled: true,
          options: {
            element: arrowRef.current,
          },
        },
      ]}
      onMouseEnter={() => setDropdownEl(dropDownRef.current)}
      onMouseLeave={() => {
        setDropdownEl(null);
        setRoute(null);
      }}
    >
      {({ TransitionProps }) => (
        <Grow {...TransitionProps}>
          <Paper elevation={4}>
            <Typography variant="h1" color="white">
              <Icon ref={arrowRef} sx={{ mt: -3 }}>
                arrow_drop_up
              </Icon>
            </Typography>
            <Box>{renderSubRoutes}</Box>
          </Paper>
        </Grow>
      )}
    </Popper>
  );

  return (
    <nav>
      <Box role="menubar" sx={{ display: { xs: 'none', lg: 'flex' } }}>
        {renderRoutes}
      </Box>
      <Box role="menubar" sx={{ xs: 'inline-block', lg: 'none' }}></Box>
      {dropdownMenu}
    </nav>
  );
}

export default NavBarMenu;
