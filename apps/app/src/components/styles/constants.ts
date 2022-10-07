import { cyan, purple } from '@mui/material/colors';
import { alpha } from '@mui/material/styles';
import { Colors, Shadow, Size } from '../types';
import { boxColorShadow, boxShadow, linearGradient, pxToRem } from './utils';

export const blue = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#99CCF3',
  300: '#66B2FF',
  400: '#3399FF',
  main: '#007FFF',
  500: '#007FFF',
  600: '#0072E5', // vs blueDark 900: WCAG 4.6 AAA (large), APCA 36 Not for reading text
  700: '#0059B2',
  800: '#004C99',
  900: '#003A75',
};
export const blueDark = {
  50: '#E2EDF8',
  100: '#CEE0F3',
  200: '#91B9E3',
  300: '#5090D3',
  main: '#5090D3',
  400: '#265D97',
  500: '#1E4976',
  600: '#173A5E',
  700: '#132F4C', // contrast 13.64:1
  800: '#001E3C',
  900: '#0A1929',
};

export const grey = {
  50: '#F3F6F9',
  100: '#E7EBF0',
  200: '#E0E3E7',
  300: '#CDD2D7', // vs blueDark 900: WCAG 11.6 AAA, APCA 78 Best for text
  400: '#B2BAC2', // vs blueDark 900: WCAG 9 AAA, APCA 63.3 Ok for text
  500: '#A0AAB4', // vs blueDark 900: WCAG 7.5 AAA, APCA 54.3 Only for large text
  600: '#6F7E8C', // vs white bg: WCAG 4.1 AA, APCA 68.7 Ok for text
  700: '#3E5060', // vs white bg: WCAG 8.3 AAA, APCA 88.7 Best for text
  800: '#2D3843', // vs white bg: WCAG 11.9 AAA, APCA 97.3 Best for text
  900: '#1A2027',
};

export const error = {
  50: '#FFF0F1',
  100: '#FFDBDE',
  200: '#FFBDC2',
  300: '#FF99A2',
  400: '#FF7A86',
  500: '#FF505F',
  main: '#EB0014', // contrast 4.63:1
  600: '#EB0014',
  700: '#C70011',
  800: '#94000D',
  900: '#570007',
};

export const success = {
  50: '#E9FBF0',
  100: '#C6F6D9',
  200: '#9AEFBC',
  300: '#6AE79C',
  400: '#3EE07F',
  500: '#21CC66',
  600: '#1DB45A',
  main: '#1AA251',
  700: '#1AA251',
  800: '#178D46',
  900: '#0F5C2E',
};

export const warning = {
  50: '#FFF9EB',
  100: '#FFF3C1',
  200: '#FFECA1',
  300: '#FFDC48', // vs blueDark900: WCAG 10.4 AAA, APCA 72 Ok for text
  400: '#F4C000', // vs blueDark900: WCAG 6.4 AA normal, APCA 48 Only large text
  500: '#DEA500', // vs blueDark900: WCAG 8 AAA normal, APCA 58 Only large text
  main: '#DEA500',
  600: '#D18E00', // vs blueDark900: WCAG 6.4 AA normal, APCA 48 Only large text
  700: '#AB6800', // vs white bg: WCAG 4.4 AA large, APCA 71 Ok for text
  800: '#8C5800', // vs white bg: WCAG 5.9 AAA large, APCA 80 Best for text
  900: '#5A3600', // vs white bg: WCAG 10.7 AAA, APCA 95 Best for text
};

export const white = '#ffffff';

export const black = '#000000';

export const transparent = 'transparent';
export const inputBorderColor = '#d2d6da';

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

  borderRadius: {
    xs: pxToRem(1.6),
    sm: pxToRem(2),
    md: pxToRem(6),
    lg: pxToRem(8),
    xl: pxToRem(12),
    xxl: pxToRem(16),
    section: pxToRem(160),
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
  primary: boxColorShadow(black, blueDark.main),
  secondary: boxColorShadow(black, purple[500]),
  info: boxColorShadow(black, cyan[500]),
  success: boxColorShadow(black, success.main),
  warning: boxColorShadow(black, warning.main),
  error: boxColorShadow(black, error.main),
};

export const gradients: Record<Colors, any> = {
  primary: linearGradient(blue.main, blueDark.main),
  secondary: linearGradient(purple.A700, purple.A100),
  info: linearGradient(cyan.A700, cyan.A100),
  success: linearGradient(success[700], success[100]),
  warning: linearGradient(warning[700], warning[100]),
  error: linearGradient(error[700], error[100]),
};
