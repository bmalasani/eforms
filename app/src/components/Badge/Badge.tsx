import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { boxShadows, gradiants, borderRadiuses } from '../../styles/constants';
import { BorderRadius, Colors, Shadow } from '../../types';

export interface StyledBadgeProps extends BadgeProps {
  bgColor?: Colors | 'light' | 'dark';
  shadow?: Shadow | Colors;
}

const StyledBadge = styled(Badge, {
  shouldForwardProp: (prop) => !['gradient', 'bgColor', 'shadow'].includes(prop as string),
})<StyledBadgeProps>(({ bgColor, shadow, theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: bgColor && (bgColor in theme.palette ? (theme.palette as any)[bgColor]?.main : bgColor),
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

export default StyledBadge;
