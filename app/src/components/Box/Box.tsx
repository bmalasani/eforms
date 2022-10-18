import Box, { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { boxShadows, gradiants, borderRadiuses } from '../../styles/constants';
import { BorderRadius, Colors, Shadow } from '../../types';

export interface StyledBoxProps extends BoxProps {
  gradient?: Colors | 'light' | 'dark';
  radius?: BorderRadius;
  shadow?: Shadow | Colors;
  [k: string]: any;
}

const StyledBox = styled(Box, {
  shouldForwardProp: (prop) => !['gradient', 'radius', 'shadow'].includes(prop as string),
})<StyledBoxProps>(({ gradient, radius, shadow, theme }) => ({
  ...(gradient && {
    background: gradiants[gradient],
    color: gradient != 'light' ? theme.palette.common.white : theme.palette.common.black,
  }),
  ...(shadow && {
    boxShadow: boxShadows[shadow],
  }),
  ...(radius && {
    borderRadius: borderRadiuses[radius],
  }),
}));

export default StyledBox;
