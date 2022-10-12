import { alpha, Theme, ThemeOptions } from '@mui/material/styles';
import { colors, systemFont, transparent } from './constants';
import { pxToRem } from './utils';

export function getThemedComponents(theme: Theme): Theme['components'] {
  return {
    MuiAppBar: {
      defaultProps: {
        position: 'sticky',
        variant: 'outlined',
        color: 'transparent',
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backdropFilter: 'blur(20px)',
          boxShadow: `inset 0px -1px 1px ${
            theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.grey[100]
          }`,
          backgroundColor:
            theme.palette.mode === 'dark'
              ? alpha(theme.palette.primary.main, 0.72)
              : 'rgba(255,255,255,0.72)',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          display: 'flex',
          alignItems: 'center',
          minHeight: '56px',
        },
      },
    },
    MuiCssBaseline: {
      defaultProps: {
        enableColorScheme: true,
      },
      styleOverrides(theme) {
        return {
          html: {
            scrollBehavior: 'smooth',
            // background:
            //   theme.palette.mode === 'dark'
            //     ? 'linear-gradient(to top, #101f31, #444546) no-repeat fixed'
            //     : 'linear-gradient(to top, #0eb5d5, #ffffff) no-repeat fixed',
          },
          '*, *::before, *::after': {
            margin: 0,
            padding: 0,
          },
          'a, a:link, a:visited': {
            textDecoration: 'none !important',
          },
        };
      },
    },
  };
}

export function getDesignTokens(mode: 'light' | 'dark' = 'light'): ThemeOptions {
  return {
    palette: {
      mode,
      // background: {
      //   default: mode === 'dark' ? '#101f31' : '#ffffff',
      // },
      // ...colors,
    },
    typography: {
      fontFamily: [...systemFont].join(','),
      h1: {
        fontSize: 'clamp(2.625rem, 1.2857rem + 3.5714vw, 4rem)',
        fontWeight: 800,
        lineHeight: 78 / 70,
      },
      h2: {
        fontSize: 'clamp(1.5rem, 0.9643rem + 1.4286vw, 2.25rem)',
        fontWeight: 800,
        lineHeight: 44 / 36,
      },
      h3: {
        fontSize: pxToRem(36),
        lineHeight: 44 / 36,
        letterSpacing: 0.2,
      },
      h4: {
        fontSize: pxToRem(28),
        lineHeight: 42 / 28,
        letterSpacing: 0.2,
      },
      h5: {
        fontSize: pxToRem(24),
        lineHeight: 36 / 24,
        letterSpacing: 0.1,
      },
      h6: {
        fontSize: pxToRem(20),
        lineHeight: 30 / 20,
      },
      button: {
        textTransform: 'initial',
        fontWeight: 700,
        letterSpacing: 0,
      },
      subtitle1: {
        fontSize: pxToRem(18),
        lineHeight: 24 / 18,
        letterSpacing: 0,
        fontWeight: 500,
      },
      body1: {
        fontSize: pxToRem(16), // 16px
        lineHeight: 24 / 16,
        letterSpacing: 0,
      },
      body2: {
        fontSize: pxToRem(14), // 14px
        lineHeight: 21 / 14,
        letterSpacing: 0,
      },
      caption: {
        display: 'inline-block',
        fontSize: pxToRem(12), // 12px
        lineHeight: 18 / 12,
        letterSpacing: 0,
        fontWeight: 700,
      },
      allVariants: {
        scrollMarginTop: 'calc(var(--MuiDocs-header-height) + 32px)',
      },
    },
  };
}
