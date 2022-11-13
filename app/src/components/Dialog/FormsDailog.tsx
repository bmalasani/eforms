import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Link } from 'react-router-dom';
import { Box } from '../Box';
import { Typography } from '../Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { Close, ExpandLess, ExpandMore } from '@mui/icons-material';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItem, { ListItemProps } from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Card } from '../Cards';
import Button from '@mui/material/Button';

interface TabPanelProps {
  children?: React.ReactNode;
  currentValue: string;
  value: string;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function TabPanel(props: TabPanelProps) {
  const { children, value, currentValue } = props;

  return (
    <Box
      sx={{
        flex: 1,
        flexGrow: 1,
      }}
      role="tabpanel"
      hidden={value !== currentValue}
      id={`vertical-tabpanel-${currentValue}`}
      aria-labelledby={`vertical-tab-${currentValue}`}
    >
      {value === currentValue && (
        <Box
          sx={{ p: 3, gap: 4, flexDirection: 'row', flex: 1, display: 'flex', flexWrap: 'wrap' }}
        >
          {children}
        </Box>
      )}
    </Box>
  );
}

interface ListItemLinkProps extends ListItemProps {
  to: string;
  open?: boolean;
  primary: string;
}

function ListItemLink(props: ListItemLinkProps) {
  const { to, open, primary, ...other } = props;

  let icon = null;
  if (open != null) {
    icon = open ? <ExpandLess /> : <ExpandMore />;
  }

  return (
    <li>
      <ListItem button component={Link as any} to={to} {...other}>
        <ListItemText primary={primary} />
        {icon}
      </ListItem>
    </li>
  );
}

export default function FormsDailog({ open, handleClose }: any) {
  const formGroups = ['General', 'IT Forms', 'Finance', 'Workforce'];
  const forms = ['Key Requisation', 'IT Access', 'IT ChangeRequest', 'Change of Status'];

  const [value, setValue] = React.useState(formGroups[0]);
  const [openCollapse, setOpenCollaspe] = React.useState(true);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Dialog
      maxWidth="md"
      fullWidth
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
    >
      <DialogTitle>
        {'Available Forms'}
        {handleClose ? (
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>
        ) : null}
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: { sm: 'none', md: 'flex' } }}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: 'divider', minWidth: '200px', borderRadius: '0' }}
          >
            {formGroups.map((group) => (
              <Tab key={group} label={group} value={group} />
            ))}
          </Tabs>
          <>
            {formGroups.map((group) => (
              <TabPanel key={group} value={group} currentValue={value}>
                {forms.map((form) => (
                  <Button variant="contained" sx={{ maxWidth: '200px' }} key={form}>
                    {form}
                  </Button>
                ))}
              </TabPanel>
            ))}
          </>
        </Box>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Link onClick={handleClose}  to="/form">
          Create New Form
        </Link>
      </DialogActions>
    </Dialog>
  );
}
