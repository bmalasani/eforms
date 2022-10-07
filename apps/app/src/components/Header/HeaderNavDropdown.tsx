import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Chip from '@mui/material/Chip';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownRounded from '@mui/icons-material/KeyboardArrowDownRounded';
import SvgHamburgerMenu from '../icons/SvgHamburgerMenu';
import Link from '@mui/material/Link';

const Anchor = styled('a')<{ component?: React.ElementType; noLinkStyle?: boolean }>(
  ({ theme }) => ({
    ...theme.typography.body2,
    fontWeight: theme.typography.fontWeightBold,
    textDecoration: 'none',
    border: 'none',
    width: '100%',
    backgroundColor: 'transparent',
    color: theme.palette.mode === 'dark' ? '#fff' : theme.palette.text.secondary,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
    transition: theme.transitions.create('background'),
    '&:hover, &:focus-visible': {
      backgroundColor:
        theme.palette.mode === 'dark' ? theme.palette.primaryDark[700] : theme.palette.grey[100],
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
  })
);

const UList = styled('ul')({
  listStyleType: 'none',
  padding: 0,
  margin: 0,
});

const PRODUCTS = [
  {
    name: 'MUI Core',
    description: 'Ready-to-use foundational React components, free forever.',
    href: 'productCore',
  },
  {
    name: 'MUI X',
    description: 'Advanced and powerful components for complex use-cases.',
    href: 'productAdvanced',
  },
  {
    name: 'Templates',
    description: 'Fully built, out-of-the-box, templates for your application.',
    href: 'productTemplates',
  },
  {
    name: 'Design kits',
    description: 'Our components available in your favorite design tool.',
    href: 'productDesignKits',
  },
  {
    name: 'MUI Toolpad',
    description: 'Low-code admin builder.',
    href: 'productToolpad',
  },
];

const DOCS = [
  {
    name: 'Material UI',
    description: "React components that implement Google's Material Design.",
    href: 'materialDocs',
  },
  {
    name: 'Joy UI',
    description: 'React components for building your design system.',
    href: 'joyDocs',
  },
  {
    name: 'MUI Base',
    description: 'Unstyled React components and low-level hooks.',
    href: 'baseDocs',
  },
  {
    name: 'MUI System',
    description: 'CSS utilities for rapidly laying out custom designs.',
    href: 'systemDocs',
  },
  {
    name: 'MUI X',
    description: 'Advanced and powerful components for complex use cases.',
    href: 'advancedComponents',
  },
];

export default function HeaderNavDropdown() {
  const [open, setOpen] = React.useState(false);
  const [productsOpen, setProductsOpen] = React.useState(true);
  const [docsOpen, setDocsOpen] = React.useState(false);
  const hambugerRef = React.useRef<HTMLButtonElement | null>(null);
  return (
    <React.Fragment>
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
            top: 56,
            left: 0,
            right: 0,
            boxShadow: (theme) =>
              `0px 4px 20px ${
                theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(170, 180, 190, 0.3)'
              }`,
            bgcolor: 'background.paper',
          }}
        >
          <Box
            sx={{
              p: 2,
              bgcolor: 'background.paper',
              maxHeight: 'calc(100vh - 56px)',
              overflow: 'auto',
            }}
          >
            <UList>
              <li>
                <Anchor
                  as="button"
                  onClick={() => setProductsOpen((bool) => !bool)}
                  sx={{ justifyContent: 'space-between' }}
                >
                  Products
                  <KeyboardArrowDownRounded
                    color="primary"
                    sx={{
                      transition: '0.3s',
                      transform: productsOpen ? 'rotate(-180deg)' : 'rotate(0)',
                    }}
                  />
                </Anchor>
                <Collapse in={productsOpen}>
                  <UList
                    sx={{
                      borderLeft: '1px solid',
                      borderColor: (theme) =>
                        theme.palette.mode === 'dark' ? 'primaryDark.700' : 'grey.100',
                      pl: 1,
                      pb: 1,
                      ml: 1,
                    }}
                  >
                    {PRODUCTS.map((item) => (
                      <li key={item.name}>
                        <Anchor
                          href={item.href}
                          as={Link}
                          noLinkStyle
                          sx={{ flexDirection: 'column', alignItems: 'initial' }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}
                          >
                            {item.name}
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            {item.description}
                          </Typography>
                        </Anchor>
                      </li>
                    ))}
                  </UList>
                </Collapse>
              </li>
              <li>
                <Anchor
                  as="button"
                  onClick={() => setDocsOpen((bool) => !bool)}
                  sx={{ justifyContent: 'space-between' }}
                >
                  Docs
                  <KeyboardArrowDownRounded
                    color="primary"
                    sx={{
                      transition: '0.3s',
                      transform: docsOpen ? 'rotate(-180deg)' : 'rotate(0)',
                    }}
                  />
                </Anchor>
                <Collapse in={docsOpen}>
                  <UList
                    sx={{
                      borderLeft: '1px solid',
                      borderColor: (theme) =>
                        theme.palette.mode === 'dark' ? 'primaryDark.700' : 'grey.100',
                      pl: 1,
                      pb: 1,
                      ml: 1,
                    }}
                  >
                    {DOCS.map((item) => (
                      <li key={item.name}>
                        <Anchor
                          href={item.href}
                          as={Link}
                          noLinkStyle
                          sx={{ flexDirection: 'column', alignItems: 'initial' }}
                        >
                          {item.name}
                          <Typography variant="body2" color="text.secondary">
                            {item.description}
                          </Typography>
                        </Anchor>
                      </li>
                    ))}
                  </UList>
                </Collapse>
              </li>
              <li>
                <Anchor href={'pricing'} as={Link} noLinkStyle>
                  Pricing
                </Anchor>
              </li>
              <li>
                <Anchor href={'about'} as={Link} noLinkStyle>
                  About us
                </Anchor>
              </li>
              <li>
                <Anchor href={'blog'} as={Link} noLinkStyle>
                  Blog
                </Anchor>
              </li>
            </UList>
          </Box>
        </Collapse>
      </ClickAwayListener>
    </React.Fragment>
  );
}
