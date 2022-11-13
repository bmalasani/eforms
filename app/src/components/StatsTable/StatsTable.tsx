import InputOutlined from '@mui/icons-material/InputOutlined';
import Card from '@mui/material/Card';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { first } from '../../utils';
import { Avatar } from '../Avatar';
import { Box } from '../Box';
import { ColumnProps, Table } from '../Table';

type StatsTableProps = {
  rows: any;
};

const columns: ColumnProps[] = [
  {
    label: 'Request Id',
    feildId: 'requestId',
  },
  {
    label: 'Form',
    feildId: 'form.formName',
  },
  {
    label: 'Approvers',
    render: (row: any) => (
      <Stack direction="row">
        {row.requestWorkFlow.map((f: any, ind: number) => (
          <Tooltip key={ind} title={f?.approver} placeholder="top">
            <Avatar
              alt="name"
              gradient='primary'
              sx={(theme) => ({
                width: theme.spacing(4),
                height: theme.spacing(4),
                border: `2px solid ${theme.palette.background.paper}`,
                cursor: 'pointer',
                position: 'relative',
                '&:not(:first-of-type)': {
                  ml: -1.25,
                },
                '&:hover, &:focus': {
                  zIndex: '10',
                },
              })}
            >
              {first(f?.approver, '?')}
            </Avatar>
          </Tooltip>
        ))}
      </Stack>
    ),
  },
  {
    label: '',
    render: (row: any) => (
      <Stack direction="row">
        <Tooltip title="View Request">
          <IconButton color="info">
            <Icon>visibility</Icon>
          </IconButton>
        </Tooltip>
      </Stack>
    ),
  },
];

function StatsTable({ rows }: StatsTableProps) {
  const [tab, setTab] = useState('Requests');
  return (
    <Card>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          p: 2,
        }}
      >
        <Typography variant="h6">Recent {tab}</Typography>
        <Tabs  value={tab} orientation="horizontal" onChange={(evt, value) => setTab(value)}>
          <Tab
            icon={<InputOutlined />}
            iconPosition="start"
            label="Requests"
            value="Requests"
          ></Tab>
          <Tab
            icon={<InputOutlined />}
            iconPosition="start"
            label="Approvals"
            value="Approvals"
          ></Tab>
          <Tab icon={<InputOutlined />} iconPosition="start" label="Actions" value="Actions"></Tab>
        </Tabs>
      </Box>
      <Box>
        <Table headers={columns} rows={rows} noEndBorder></Table>
      </Box>
    </Card>
  );
}

export default StatsTable;
