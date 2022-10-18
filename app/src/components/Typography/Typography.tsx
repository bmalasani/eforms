import Typography, { TypographyProps } from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { boxShadows, gradiants, borderRadiuses } from '../../styles/constants';
import { BorderRadius, Colors, Shadow } from '../../types';

export interface StyledTypographyProps extends TypographyProps {
  gradient?: boolean;
  bgColor?: Colors | 'light' | 'dark';
  radius?: BorderRadius;
  shadow?: Shadow | Colors;
  [k: string]: any;
}

const StyledTypography = styled(Typography, {
  shouldForwardProp: (prop) =>
    !['gradient', 'bgColor', 'radius', 'shadow'].includes(prop as string),
})<StyledTypographyProps>(({ gradient, bgColor, radius, shadow, theme }) => ({
  ...(bgColor &&
    (gradient
      ? {
          background: gradiants[bgColor],
        }
      : {
          color: bgColor in theme.palette ? (theme.palette as any)[bgColor].main : bgColor,
        })),
  ...(shadow && {
    boxShadow: boxShadows[shadow],
  }),
  ...(radius && {
    borderRadius: borderRadiuses[radius],
  }),
}));

export default StyledTypography;
