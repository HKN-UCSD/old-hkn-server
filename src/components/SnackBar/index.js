import React from 'react';
import PropTypes from 'prop-types';
import { Snackbar as MuiSnackbar } from '@material-ui/core/';
import Alert from '@material-ui/lab/Alert';

export default function Snackbar({
  message,
  alertLevel,
  duration,
  ...props
}) {
  const [open, setOpen] = React.useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <MuiSnackbar

      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}



      open={open}

      autoHideDuration={duration}
      onClose={handleClose}


      action={
        <React.Fragment>
          <Alert onClose={handleClose} variant="filled" severity={alertLevel} >
            {message}
          </Alert>
        </React.Fragment>
      }
    />
  );
}

Snackbar.propTypes = {
  message: PropTypes.string,
  alertLevel: PropTypes.string,
  duration: PropTypes.number,
};

Snackbar.defaultProps = {
  message: "This is a test message",
  alertLevel: "error",
  duration: 6000,
};
