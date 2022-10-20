import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import { Box } from "../Box";
import { Typography } from "../Typography";


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
