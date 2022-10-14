import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Icon from '@mui/material/Icon';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { Colors, Shadow } from '../../types';
import { Box } from '../Box';

export interface StatisticsCardProps {
  title: string;
  icon: string;
  count: number | string;
  gradient?: boolean;
  variant?: Colors | 'light' | 'dark';
  shadow?: Shadow | Colors;
}

function StatisticsCard({ icon, title, count, gradient, shadow, variant }: StatisticsCardProps) {
  return (
    <Card>
      <Box display="flex" justifyContent="space-between" pt={1} px={2}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="4rem"
          height="4rem"
          gradient={gradient}
          variant={variant}
          shadow={shadow}
          radius="lg"
          mt={-3}
        >
          <Icon fontSize="medium" color="inherit">
            {icon}
          </Icon>
        </Box>
        <Box
          sx={{
            py: 1.5,
            textAlign: 'right',
          }}
        >
          <Typography variant="button" fontWeight="light">
            {title}
          </Typography>
          <Typography variant="h4">{count}</Typography>
        </Box>
      </Box>
      <Divider />
      <Box
        display="flex"
        justifyContent="space-between"
        flexDirection="row-reverse"
      >
        <Button LinkComponent={Link}>Show All</Button>
      </Box>
    </Card>
  );
}

export default StatisticsCard;
