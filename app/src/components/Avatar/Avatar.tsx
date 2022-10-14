import Avatar, { AvatarProps } from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import { boxShadows, gradiants, borderRadiuses } from '../../styles/constants';
import { BorderRadius, Colors, Shadow } from '../../types';

export interface StyledAvatarProps extends AvatarProps {
  gradient?: boolean;
  bgColor?: Colors | 'light' | 'dark';
  radius?: BorderRadius;
  shadow?: Shadow | Colors;
}

const StyledAvatar = styled(Avatar, {
  shouldForwardProp: (prop) =>
    !['gradient', 'bgColor', 'radius', 'shadow'].includes(prop as string),
})<StyledAvatarProps>(({ gradient, bgColor, radius, shadow, theme }) => ({
  ...(bgColor &&
    (gradient
      ? {
          background: gradiants[bgColor],
          color: bgColor != 'light' ? theme.palette.common.white : theme.palette.common.black,
        }
      : {
          color: bgColor != 'light' ? theme.palette.common.white : theme.palette.common.black,
          background: bgColor in theme.palette ? (theme.palette as any)[bgColor]?.main : bgColor,
        })),
  ...(shadow && {
    boxShadow: boxShadows[shadow],
  }),
  ...(radius && {
    borderRadius: borderRadiuses[radius],
  }),
}));

export default StyledAvatar;
