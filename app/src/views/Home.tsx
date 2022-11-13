import { Add, Assignment, AssignmentIndOutlined, Drafts, Task } from '@mui/icons-material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import React from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import { StatsTable, Typography } from '../components';
import { Avatar } from '../components/Avatar';
import { Badge } from '../components/Badge';
import { Box } from '../components/Box';
import { StatisticsCard } from '../components/Cards';
import { StatsSkeleton } from '../skeletons';
import { get } from '../utils';

function Home() {
  const { stats, requests }: any = useLoaderData();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack direction="column" gap={5}>
        <Stack justifyContent="space-between" direction="row">
          <Typography variant="h4" bgColor="info">
            Welcome Nani Malasani !
          </Typography>
          {/* <IconButton aria-label="New Request" sx={{ display: { xs: 'none', md: 'initial' } }}>
            <Badge
              bgColor="success"
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot"
            >
              <Avatar gradient="info" shadow="info">
                <Add />
              </Avatar>
            </Badge>
          </IconButton> */}
        </Stack>
        <React.Suspense fallback={<StatsSkeleton />}>
          <Await resolve={stats}>
            {(stats) => {
              return (
                <Grid container spacing={3}>
                  <Grid item xs={12} md={3}>
                    <Box mb={1.5}>
                      <StatisticsCard
                        shadow="success"
                        gradient="success"
                        icon={<Task />}
                        title="Requests"
                        count={stats.requests}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Box mb={1.5}>
                      <StatisticsCard
                        shadow="error"
                        gradient="error"
                        icon={<Assignment />}
                        title="Approvals"
                        count={stats.approvals}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Box mb={1.5}>
                      <StatisticsCard
                        shadow="warning"
                        gradient="warning"
                        icon={<AssignmentIndOutlined />}
                        title="Actions"
                        count={stats.actions}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Box mb={1.5}>
                      <StatisticsCard
                        shadow="xl"
                        gradient="dark"
                        icon={<Drafts />}
                        title="Drafts"
                        count={stats.drafts}
                      />
                    </Box>
                  </Grid>
                </Grid>
              );
            }}
          </Await>
        </React.Suspense>

        <React.Suspense fallback={<StatsSkeleton />}>
          <Await resolve={requests}>
            {(requests) => {
              return (
                <Grid container spacing={3}>
                  <Grid item xs={12} md={8}>
                    <Box mb={1.5}>
                      <StatsTable rows={get(requests, 'requests', [])} />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box mb={1.5}></Box>
                  </Grid>
                </Grid>
              );
            }}
          </Await>
        </React.Suspense>
      </Stack>
    </Container>
  );
}

export default Home;
