import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import { Avatar } from '../components/Avatar';
import { Badge } from '../components/Badge';
import { Box } from '../components/Box';
import { StatisticsCard } from '../components/Cards';
import { columns, rows } from './data';

function Home() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack justifyContent="space-between" direction="row" sx={{ pb: 4, mb: 4 }}>
        <Typography variant="h4">Welcome Nani Malasani !</Typography>
        <IconButton aria-label="New Request">
          <Badge
            bgColor="success"
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
          >
            <Avatar gradient bgColor="info" shadow="info">
              <Icon>addtask</Icon>
            </Avatar>
          </Badge>
        </IconButton>
      </Stack>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <Box mb={1.5}>
            <StatisticsCard
              gradient
              shadow="success"
              variant="success"
              icon="task"
              title="Requests"
              count={281}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Box mb={1.5}>
            <StatisticsCard
              gradient
              shadow="error"
              variant="error"
              icon="assignment"
              title="Approvals"
              count="2,300"
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Box mb={1.5}>
            <StatisticsCard
              gradient
              shadow="warning"
              variant="warning"
              icon="assignment_ind"
              title="Actions"
              count="34k"
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Box mb={1.5}>
            <StatisticsCard
              gradient
              shadow="xl"
              variant="dark"
              icon="drafts"
              title="Drafts"
              count="+91"
            />
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={8}>
          <Card
            sx={{
              p: 2,
            }}
          >
            <Stack direction="row" spacing={4}>
              <Typography variant="h6">Recent Requests</Typography>
              <Tabs orientation="horizontal">
                <Tab icon="article" label="Requests"></Tab>
                <Tab icon="article" label="Approvals"></Tab>
                <Tab icon="article" label="Actions"></Tab>
              </Tabs>
            </Stack>
            <Box sx={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
              />
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}></Grid>
      </Grid>
    </Container>
  );
}

export default Home;
