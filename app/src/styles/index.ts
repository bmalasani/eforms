import { alpha, Theme, ThemeOptions } from '@mui/material/styles';
import { boxShadows, systemFont } from './constants';
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
    // MuiTabs: {
    //   styleOverrides: {
    //     root: {
    //       position: 'relative',
    //       backgroundColor: theme.palette.grey[100],
    //       borderRadius: theme.spacing(2),
    //       minHeight: 'unset',
    //       padding: theme.spacing(0.5),
    //     },
    //     flexContainer: {
    //       height: '100%',
    //       position: 'relative',
    //       zIndex: 10,
    //     },
    //     vertical: {
    //       '& .MuiTabs-indicator': {
    //         width: '100%',
    //       },
    //     },
    //     indicator: {
    //       height: '100%',
    //       borderRadius: theme.spacing(2),
    //       backgroundColor: theme.palette.common.white,
    //       boxShadow: boxShadows.inset,
    //       transition: 'all 500ms ease',
    //     },
    //   },
    // },
    // MuiTab: {
    //   styleOverrides: {
    //     root: {
    //       display: 'flex',
    //       alignItems: 'center',
    //       flexDirection: 'row',
    //       flex: '1 1 auto',
    //       textAlign: 'center',
    //       maxWidth: 'unset !important',
    //       minWidth: 'unset !important',
    //       minHeight: 'unset !important',
    //       fontSize: theme.typography.pxToRem(14),
    //       fontWeight: theme.typography.fontWeightRegular,
    //       textTransform: 'none',
    //       lineHeight: 'inherit',
    //       padding: theme.spacing(0.5),
    //       borderRadius: theme.spacing(2),
    //       opacity: '1 !important',

    //       '& .material-icons, .material-icons-round': {
    //         marginBottom: '0 !important',
    //         marginRight: theme.spacing(0.3),
    //       },

    //       '& svg': {
    //         marginBottom: '0 !important',
    //         marginRight: theme.spacing(0.3),
    //       },

    //       '& i.MuiTab-iconWrapper': {
    //         marginBottom: 0,
    //       },
    //     },
    //     labelIcon: {
    //       paddingTop: theme.spacing(0.5),
    //     },
    //   },
    // },
    MuiCard: {
      styleOverrides: {
        root: {
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          wordWrap: 'break-word',
          backgroundColor:
            theme.palette.mode === 'light' ? theme.palette.common.white : theme.palette.grey[800],
          backgroundClip: 'border-box',
          borderRadius: theme.typography.pxToRem(12),
          boxShadow: boxShadows.md,
          overflow: 'visible',
        },
      },
    },
    MuiTableContainer:{
      styleOverrides:{
        root:{

        }
      }
    }
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
