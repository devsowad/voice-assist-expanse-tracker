import React from 'react';
import { Snackbar as MUISnackbar, Alert, Slide } from '@mui/material';

function Transition(props) {
  return <Slide {...props} direction='left' />;
}

const Snackbar = ({ open, setOpen }) => {
  const handleClose = (e, reason) => {
    if (reason === 'clickaway') return;

    setOpen(false);
  };

  return (
    <MUISnackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      TransitionComponent={Transition}
    >
      <Alert
        onClose={handleClose}
        severity='success'
        variant='filled'
        sx={{ width: '100%' }}
      >
        Transaction successfully created
      </Alert>
    </MUISnackbar>
  );
};

export default Snackbar;
