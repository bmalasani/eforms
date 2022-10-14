import { Box, Container, Divider, Typography } from '@mui/material';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backdropFilter: 'blur(10px)',
      }}
    >
      <Divider />
      <Container>
        <Box
          sx={{
            py: 2,
            display: { xs: 'inline-block', sx: 'flex' },
            alignItems: { sm: 'center' },
            justifyContent: { sm: 'space-between' },
          }}
        >
          <Typography color="text.secondary" variant="body2">
            Copyright © {new Date().getFullYear()} EForms.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
