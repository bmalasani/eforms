import { Colors, Shadow, Size } from './styles';

export * from './styles';

declare module '@mui/material/styles' {
  interface Theme {
    custom: {
      sizes: Record<Size | 'xxs' | '2xl' | '3xl', string>;
      functions: {
        linearGradient: (color: string, colorState: string, angle?: number) => string;
        boxShadow: (
          offset: [number, number],
          radius: [number, number],
          color: string,
          opacity: number,
          inset?: string
        ) => string;
        pxToRem: (number: number, baseNumber?: number) => string;
      };
      gradients: Record<Colors, any>;
      boxShadows: Record<Shadow | Colors, any>;
      borders: {
        borderColor: string;
        borderWidth: any;
        borderRadius: any;
      };
      [key: string]: any;
    };
  }
}

declare module '@mui/material/styles/createPalette' {
  interface ColorRange {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  }

  interface PaletteColor extends ColorRange {}

  interface Palette {
    primaryDark: PaletteColor;
  }
}

declare module '@mui/material/styles/createTypography' {
  interface TypographyOptions {
    fontWeightSemiBold?: number;
    fontWeightExtraBold?: number;
    fontFamilyCode?: string;
  }

  interface Typography {
    fontWeightSemiBold: number;
    fontWeightExtraBold: number;
    fontFamilyCode: string;
  }
}
