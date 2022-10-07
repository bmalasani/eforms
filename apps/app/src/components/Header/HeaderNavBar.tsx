import * as React from 'react';
import { unstable_debounce as debounce } from '@mui/utils';
import { Navigation } from './Navigation';

const routes = [
  {
    displayName: 'Forms',
    icon: 'test',
    submenu: [
      {
        displayName: 'New Form',
        route: '/',
        icon: 'test',
      },
    ],
  },
  { displayName: 'Approvals', icon: 'test' },
  { displayName: 'Actions', icon: 'test' },
  { displayName: 'Drafts', icon: 'test' },
];

export default function HeaderNavBar() {
  const [subMenuOpen, setSubMenuOpen] = React.useState<null | string>(null);
  const navRef = React.useRef<HTMLUListElement | null>(null);

  const setSubMenuOpenDebounced = React.useMemo(
    () => debounce(setSubMenuOpen, 40),
    [setSubMenuOpen]
  );

  const setSubMenuOpenUndebounce = React.useMemo(
    () => (value: typeof subMenuOpen) => {
      setSubMenuOpenDebounced.clear();
      setSubMenuOpen(value);
    },
    [setSubMenuOpen, setSubMenuOpenDebounced]
  );

  React.useEffect(() => {
    return () => {
      setSubMenuOpenDebounced.clear();
    };
  }, [setSubMenuOpenDebounced]);

  return (
    <Navigation>
      <ul ref={navRef} role="menubar">
        {routes.map((route) => (
          <li
            role="none"
            onMouseEnter={() => setSubMenuOpenUndebounce(route.displayName)}
            onFocus={() => setSubMenuOpenUndebounce(route.displayName)}
            onMouseLeave={() => setSubMenuOpenDebounced(null)}
            onBlur={() => setSubMenuOpenUndebounce(null)}
          >
            <div
              role="menuitem"
              tabIndex={0}
              id={`${route.displayName}-menu`}
              aria-haspopup={route.submenu ? 'true' : 'false'}
              aria-expanded={subMenuOpen === route.displayName ? 'true' : 'false'}
            >
              {route.displayName}
            </div>
          </li>
        ))}
      </ul>
    </Navigation>
  );
}
