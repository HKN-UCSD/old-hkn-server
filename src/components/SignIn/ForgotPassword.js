import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { withFirebase } from '../../contexts/Firebase';

const DIALOGS = {
  FORM: 'form',
  SUCCESS: 'success',
  ERROR: 'error',
};

function BaseDialog({ title, handleClose, children }) {
  return (
    <Dialog open onClose={handleClose} aria-labelledby='alert-dialog-title'>
      <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
      {children}
    </Dialog>
  );
}

BaseDialog.propTypes = {
  title: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
};

function FormDialog({ email, handleClose, handleEmailChange, handleConfirm }) {
  return (
    <BaseDialog handleClose={handleClose} title='Forgot Password'>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          To reset your password, please enter your email address below.
        </DialogContentText>
        <TextField
          autoFocus
          margin='dense'
          id='forgotPasswordEmailField'
          label='Email Address'
          type='email'
          fullWidth
          onChange={handleEmailChange}
          value={email}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Cancel
        </Button>
        <Button onClick={handleConfirm} color='primary'>
          Confirm
        </Button>
      </DialogActions>
    </BaseDialog>
  );
}

FormDialog.propTypes = {
  email: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleEmailChange: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
};

function SuccessDialog({ handleClose }) {
  return (
    <BaseDialog handleClose={handleClose} title='Success'>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          A link to reset password has been sent to your email address.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          OK
        </Button>
      </DialogActions>
    </BaseDialog>
  );
}

SuccessDialog.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

function ErrorDialog({ handleClose, errorMessage }) {
  return (
    <BaseDialog handleClose={handleClose} title='Error'>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {errorMessage}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary' autoFocus>
          Back
        </Button>
      </DialogActions>
    </BaseDialog>
  );
}

ErrorDialog.propTypes = {
  handleClose: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
};

const INITIAL_STATE = {
  email: '',
  error: null,
  dialog: DIALOGS.FORM,
};

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  handleEmailChange = event => {
    this.setState({ email: event.target.value });
  };

  resetPassword = () => {
    const { firebase } = this.props;
    const { email } = this.state;

    firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({
          dialog: DIALOGS.SUCCESS,
        });
      })
      .catch(error => {
        this.setState({
          error,
          dialog: DIALOGS.ERROR,
        });
      });
  };

  render() {
    const { handleClose } = this.props;
    const { dialog, error, email } = this.state;

    switch (dialog) {
      case DIALOGS.SUCCESS:
        return <SuccessDialog handleClose={handleClose} />;
      case DIALOGS.ERROR:
        return (
          <ErrorDialog
            handleClose={handleClose}
            errorMessage={error.errorMessage}
          />
        );
      case DIALOGS.FORM:
        return (
          <FormDialog
            email={email}
            handleClose={handleClose}
            handleEmailChange={this.handleEmailChange}
            handleConfirm={this.resetPassword}
          />
        );
      default:
        return (
          <FormDialog
            email={email}
            handleClose={handleClose}
            handleEmailChange={this.handleEmailChange}
            handleConfirm={this.resetPassword}
          />
        );
    }
  }
}

ForgotPassword.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default compose(withFirebase)(ForgotPassword);
