import { SxProps, Theme } from '@mui/material/styles';
import { Box } from '../Box';
import { Typography } from '../Typography';

export type SectionProps = {
  children?: any;
  title: string;
  description?: string;
  boxSX?: SxProps<Theme>;
};

function Section({ children, title, description, boxSX }: SectionProps) {
  return (
    <Box
      component="section"
      sx={{ py: 1, display: 'flex', flex: 1, gap: 3, flexDirection: 'column' }}
    >
      <Box sx={{ py: 1 }}>
        <Typography bgColor="info" variant="h4">
          {title}
        </Typography>
        {description && (
          <Typography bgColor="warning" variant="body1">
            {description}
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          py: 1,
          display: 'flex',
          flex: 1,
          gap: 3,
          flexDirection: 'column',
          ...boxSX,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default Section;
