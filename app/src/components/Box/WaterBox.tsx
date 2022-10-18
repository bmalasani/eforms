import Box, { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { boxShadows, gradiants, borderRadiuses } from '../../styles/constants';
import { BorderRadius, Colors, Shadow } from '../../types';

export interface StyledBoxProps extends BoxProps {
  radius?: BorderRadius;
  shadow?: Shadow | Colors;
  [k: string]: any;
}

const WaterBox = styled(Box, {
  shouldForwardProp: (prop) => !['radius', 'shadow'].includes(prop as string),
})<StyledBoxProps>(({ radius, shadow, theme }) => ({
  ...(shadow && {
    boxShadow: boxShadows[shadow],
  }),
  ...(radius && {
    borderRadius: borderRadiuses[radius],
  }),
}));

export default WaterBox;
