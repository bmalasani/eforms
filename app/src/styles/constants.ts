import { alpha } from '@mui/material/styles';
import { Colors, Shadow, Size } from '../types';
import { boxColorShadow, boxShadow, linearGradient, pxToRem } from './utils';

export const white = '#ffffff';
export const black = '#000000';
export const transparent = 'transparent';
export const inputBorderColor = '#d2d6da';
export const colors = {
  primary: {
    main: '#e91e63',
  },
  secondary: {
    main: '#7b809a',
  },
  info: {
    main: '#1A73E8',
  },
  warning: {
    main: '#fb8c00',
  },
  success: {
    main: '#4CAF50',
  },
  error: {
    main: '#F44335',
  },
};
//Typography

export const systemFont = [
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  '"Helvetica Neue"',
  'Arial',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
];

export const fontFamilyCode = [
  'Consolas',
  'Menlo',
  'Monaco',
  'Andale Mono',
  'Ubuntu Mono',
  'monospace',
];

export const fontSizes: Record<Size | 'xxs' | '2xl' | '3xl', string> = {
  xxs: pxToRem(10.4),
  xs: pxToRem(12),
  sm: pxToRem(14),
  md: pxToRem(16),
  lg: pxToRem(18),
  xl: pxToRem(20),
  xxl: pxToRem(24),
  '2xl': pxToRem(24),
  '3xl': pxToRem(30),
};

//Borders
export const borderRadiuses = {
  xs: pxToRem(1.6),
  sm: pxToRem(2),
  md: pxToRem(6),
  lg: pxToRem(8),
  xl: pxToRem(12),
  xxl: pxToRem(16),
  section: pxToRem(160),
};

export const borders = {
  borderColor: alpha(white, 0.4),
  borderWidth: {
    0: 0,
    1: pxToRem(1),
    2: pxToRem(2),
    3: pxToRem(3),
    4: pxToRem(4),
    5: pxToRem(5),
  },
};

//Shadows
export const boxShadows: Record<Shadow | Colors, any> = {
  xs: boxShadow([0, 2], [9, -5], black, 0.15),
  sm: boxShadow([0, 5], [10, 0], black, 0.12),
  md: `${boxShadow([0, 2], [2, 0], black, 0.14)}, ${boxShadow(
    [0, 3],
    [1, -2],
    black,
    0.2
  )}, ${boxShadow([0, 1], [5, 0], black, 0.12)}`,
  lg: `${boxShadow([0, 10], [15, -3], black, 0.1)}, ${boxShadow([0, 4], [6, -2], black, 0.05)}`,
  xl: `${boxShadow([0, 20], [25, -5], black, 0.1)}, ${boxShadow([0, 10], [10, -5], black, 0.04)}`,
  xxl: boxShadow([0, 20], [27, 0], black, 0.05),
  inset: boxShadow([0, 1], [2, 0], black, 0.075, 'inset'),
  primary: boxColorShadow(black, colors.primary.main),
  secondary: boxColorShadow(black, colors.secondary.main),
  info: boxColorShadow(black, colors.info.main),
  success: boxColorShadow(black, colors.success.main),
  warning: boxColorShadow(black, colors.warning.main),
  error: boxColorShadow(black, colors.error.main),
};

//Gradiants

const gradientColors = {
  primary: {
    main: '#EC407A',
    state: '#D81B60',
  },

  secondary: {
    main: '#747b8a',
    state: '#495361',
  },

  info: {
    main: '#49a3f1',
    state: '#1A73E8',
  },

  success: {
    main: '#66BB6A',
    state: '#43A047',
  },

  warning: {
    main: '#FFA726',
    state: '#FB8C00',
  },

  error: {
    main: '#EF5350',
    state: '#E53935',
  },

  light: {
    main: '#EBEFF4',
    state: '#CED4DA',
  },

  dark: {
    main: '#42424a',
    state: '#191919',
  },
};

export const gradiants: Record<Colors | 'light' | 'dark', string> = {
  primary: linearGradient(gradientColors.primary),
  secondary: linearGradient(gradientColors.secondary),
  error: linearGradient(gradientColors.error),
  info: linearGradient(gradientColors.info),
  success: linearGradient(gradientColors.success),
  warning: linearGradient(gradientColors.warning),
  light: linearGradient(gradientColors.light),
  dark: linearGradient(gradientColors.dark),
};
