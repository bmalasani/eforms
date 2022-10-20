import { Box } from '../Box';
import { Typography } from '../Typography';

export type SectionProps = {
  children?: any;
  title: string;
  description?: string;
};

function Section({ children, title, description }: SectionProps) {
  return (
    <Box
      component="section"
      sx={{ p: 1, display: 'flex', flex: 1, gap: 3, flexDirection: 'column' }}
    >
      <Box sx={{ p: 1 }}>
        <Typography bgColor="info" variant="h3">
          {title}
        </Typography>
        {description && (
          <Typography bgColor="info" variant="body1">
            {description}
          </Typography>
        )}
      </Box>
      {children}
    </Box>
  );
}

export default Section;
