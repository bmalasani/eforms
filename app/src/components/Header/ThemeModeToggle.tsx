import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DarkMode from '@mui/icons-material/DarkMode';
import LightMode from '@mui/icons-material/LightMode';

interface ThemeModeToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function ThemeModeToggle(props: ThemeModeToggleProps) {
  return (
    <Tooltip title={props.checked ? 'Turn on the light' : 'Turn off the light'}>
      <IconButton color="primary" size='small'  onClick={() => props.onChange(!props.checked)}>
        {props.checked ? (
          <LightMode fontSize="small" />
        ) : (
          <DarkMode fontSize="small" />
        )}
      </IconButton>
    </Tooltip>
  );
}
