import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { forwardRef } from 'react';

type SubMenuProps = {
  icon: React.ReactElement;
  name: React.ReactNode;
  description: React.ReactNode;
  chip?: React.ReactNode;
  href: string;
} & Omit<JSX.IntrinsicElements['a'], 'ref'>;

const SubMenu = forwardRef<HTMLAnchorElement, SubMenuProps>(function SubMenu(
  { icon, name, description, chip, href, ...props },
  ref
) {
  return (
    <Box
      component={Link}
      href={href}
      ref={ref}
      sx={{
        display: 'flex',
        alignItems: 'center',
        py: 2,
        pr: 3,
        '&:hover, &:focus': {
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark'
              ? alpha(theme.palette.primaryDark[700], 0.4)
              : theme.palette.grey[50],
          outline: 'none',
          '@media (hover: none)': {
            backgroundColor: 'initial',
            outline: 'initial',
          },
        },
      }}
      {...props}
    >
      <Box
        sx={{
          px: 2,
          '& circle': {
            fill: (theme) =>
              theme.palette.mode === 'dark'
                ? theme.palette.primaryDark[700]
                : theme.palette.grey[100],
          },
        }}
      >
        {icon}
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Typography color="text.primary" variant="body2" fontWeight="bold">
          {name}
        </Typography>
        <Typography color="text.secondary" variant="body2">
          {description}
        </Typography>
      </Box>
      {chip}
    </Box>
  );
});
