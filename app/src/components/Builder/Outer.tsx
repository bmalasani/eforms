import { Add, Edit, Remove } from '@mui/icons-material';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import { FormField } from '.';
import { Box } from '../Box';
import FieldSaver from './FieldSaver';

type OuterProps = {
  children: any;
  disableActions?: boolean;
  editable?: boolean;
  renderPopOver?: Function;
  field?: FormField | undefined;
  onSaveField?: (f: FormField[], isEdit?: boolean, isRemove?: boolean) => any;
};

function Outer({ children, disableActions, field, editable, onSaveField }: OuterProps) {
  const [anchorEl, setAnchorEl] = useState<any | null>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setAnchorEl(null);
    setIsEdit(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleEditClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsEdit(true);
    setAnchorEl(event.currentTarget);
  };
  const handleRemoveClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onSaveField && field && onSaveField([field], false, true);
  };

  const handleSave = (fc: FormField[], isEdit?: boolean) => {
    setAnchorEl(null);
    onSaveField && onSaveField(fc, isEdit);
  };

  const handleClose = () => {
    setIsEdit(false);
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box
      id="outer_layer"
      component="section"
      sx={(theme) => ({
        minHeight: '4rem',
        display: 'flex',
        flex: '1 auto',
        flexDirection: 'column',
        mt: 4,
        border: `1px dashed rgba(${Math.floor(Math.random() * 255)},
          ${Math.floor(Math.random() * 255)},
          ${Math.floor(Math.random() * 255)},
          1
        )`,
        position: 'relative',
      })}
    >
      {(!disableActions || editable) && (
        <>
          <Box
            id="outer_menu"
            component="div"
            sx={(theme) => ({
              display: 'flex',
              flexFlow: 'row wrap',
              alignItems: 'center',
              position: 'absolute',
              boxSizing: 'border-box',
              zIndex: 1,
              transition: 'transform 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
              top: '0px',
              right: '0px',
              transform: 'scale(1) translate(-0%, -50%)',
              transformorigin: '100% 0%',
            })}
          >
            {editable && (
              <>
                <IconButton
                  size="small"
                  sx={{
                    borderRadius: '1rem',
                    zIndex: 1,
                    border: '1px solid',
                    width: '24px',
                    height: '24px',
                  }}
                  ref={anchorEl}
                  color="success"
                  onClick={handleEditClick}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  size="small"
                  sx={{
                    borderRadius: '1rem',
                    zIndex: 1,
                    border: '1px solid',
                    width: '24px',
                    height: '24px',
                  }}
                  ref={anchorEl}
                  color="error"
                  onClick={handleRemoveClick}
                >
                  <Remove />
                </IconButton>
              </>
            )}
            {!disableActions && (
              <IconButton
                ref={anchorEl}
                sx={{
                  borderRadius: '1rem',
                  zIndex: 1,
                  border: '1px solid',
                  width: '24px',
                  height: '24px',
                }}
                size="small"
                color="primary"
                onClick={handleClick}
              >
                <Add />
              </IconButton>
            )}
          </Box>

          {field && anchorEl && (
            <>
              <Drawer anchor={'right'} open={open} onClose={toggleDrawer}>
                <Box sx={{ width: { md: '350px', lg: '500px' }, p: { md: 3, lg: 5 } }}>
                  <FieldSaver field={field} isEdit={isEdit} onSave={handleSave} />
                </Box>
              </Drawer>
              {/* <Popper
                anchorEl={anchorEl}
                popperRef={null}
                open={open}
                placement="left"
                transition
                modifiers={[
                  {
                    name: 'arrow',
                    enabled: true,
                  },
                ]}
              >
                {({ TransitionProps }) => (
                  <Grow {...TransitionProps}>
                    <Paper
                      sx={{ position: 'relative', zIndex: 10, width: { md: '400px', lg: '600px' } }}
                      elevation={10}
                    >
                      <IconButton
                        color="primary"
                        onClick={handleClose}
                        sx={(theme) => ({
                          display: 'flex',
                          flexFlow: 'row wrap',
                          alignItems: 'center',
                          position: 'absolute',
                          boxSizing: 'border-box',
                          zIndex: 12,
                          transition: 'transform 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                          top: '0px',
                          right: '0px',
                          transform: 'scale(1) translate(50%, -50%)',
                          transformorigin: '100% 0%',
                        })}
                      >
                        <Avatar
                          sx={{ width: '24px', height: '24px' }}
                          gradient="warning"
                          shadow="warning"
                        >
                          <Icon>close</Icon>
                        </Avatar>
                      </IconButton>
                      <Box sx={{ zIndex: 100, p: { md: 3, lg: 5 } }}>
                        <FieldSaver field={field} isEdit={isEdit} onSave={handleSave} />
                      </Box>
                    </Paper>
                  </Grow>
                )}
              </Popper> */}
            </>
          )}
        </>
      )}
      {children}
    </Box>
  );
}

export default Outer;
