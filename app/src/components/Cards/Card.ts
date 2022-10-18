import Card, { CardProps } from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { boxShadows, gradiants, borderRadiuses } from '../../styles/constants';
import { BorderRadius, Colors, Shadow } from '../../types';

export interface StyledCardProps extends CardProps {
  gradient?: Colors | 'light' | 'dark';
  radius?: BorderRadius;
  shadow?: Shadow | Colors;
  [k: string]: any;
}

const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => !['gradient', 'radius', 'shadow'].includes(prop as string),
})<StyledCardProps>(({ gradient, radius, shadow, theme }) => ({
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

export default StyledCard;
