import Box, { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { boxShadows, gradiants, borderRadiuses } from '../../styles/constants';
import { BorderRadius, Colors, Shadow } from '../../types';

export interface StyledBoxProps extends BoxProps {
  gradient?: boolean;
  variant?: Colors | 'light' | 'dark';
  radius?: BorderRadius;
  shadow?: Shadow | Colors;
}

const StyledBox = styled(Box, {
  shouldForwardProp: (prop) =>
    !['gradient', 'variant', 'radius', 'shadow'].includes(prop as string),
})<StyledBoxProps>(({ gradient, variant, radius, shadow, theme }) => ({
  ...(variant &&
    (gradient
      ? {
          background: gradiants[variant],
          color: variant != 'light' ? theme.palette.common.white : theme.palette.common.black,
        }
      : {
          color: variant != 'light' ? theme.palette.common.white : theme.palette.common.black,
          background: variant in theme.palette ? (theme.palette as any)[variant].main : variant,
        })),
  ...(shadow && {
    boxShadow: boxShadows[shadow],
  }),
  ...(radius && {
    borderRadius: borderRadiuses[radius],
  }),
}));

export default StyledBox;
