import Avatar, { AvatarProps } from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import { boxShadows, gradiants, borderRadiuses } from '../../styles/constants';
import { BorderRadius, Colors, Shadow } from '../../types';

export interface StyledAvatarProps extends AvatarProps {
  gradient?: Colors | 'light' | 'dark';
  radius?: BorderRadius;
  shadow?: Shadow | Colors;
}

const StyledAvatar = styled(Avatar, {
  shouldForwardProp: (prop) => !['gradient', 'radius', 'shadow'].includes(prop as string),
})<StyledAvatarProps>(({ gradient, radius, shadow, theme }) => ({
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

export default StyledAvatar;
