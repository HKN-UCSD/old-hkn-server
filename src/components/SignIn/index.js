import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import styles from './styles';
import ForgotPassword from './ForgotPassword';
import hknLogo from '../../images/hkn-trident.png';
import { withFirebase } from '../../contexts/Firebase';
import * as ROUTES from '../../constants/routes';

const INITIAL_STATE = {
  email: '',
  password: '',
  shouldRememberUser: false,
  signInError: null,
  verifyEmailError: null,
  failedSignInDialogOpen: false,
  verifyEmailDialogOpen: false,
  failedSendVerificationEmailDialogOpen: false,
  forgotPasswordDialogOpen: false,
};

class SignInPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  handleSignIn = event => {
    const { email, password, shouldRememberUser } = this.state;
    const { firebase, history } = this.props;

    firebase
      .doSignInWithEmailAndPassword(email, password, shouldRememberUser)
      .then(() => {
        if (firebase.auth.currentUser.emailVerified) {
          history.push(ROUTES.HOME);
        } else {
          firebase.doSignOut();

          this.setState({
            verifyEmailDialogOpen: true,
          });
        }
      })
      .catch(error => {
        this.setState({
          failedSignInDialogOpen: true,
          signInError: error,
        });
      });

    event.preventDefault();
  };

  handleEmailChange = event => {
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  handleCheckRemember = event => {
    this.setState({ shouldRememberUser: event.target.checked });
  };

  handleFailedSignInDialogClose = () => {
    this.setState({
      failedSignInDialogOpen: false,
      password: '',
    });
  };

  handleVerifyEmailDialogClose = () => {
    const { firebase } = this.props;

    this.setState({
      verifyEmailDialogOpen: false,
    });
    firebase.doSignOut();
  };

  handleResendVerificationEmail = () => {
    const { firebase } = this.props;

    firebase
      .doSendVerificationEmail()
      .then(() => {
        this.handleVerifyEmailDialogClose();
      })
      .catch(error => {
        this.setState({
          verifyEmailError: error,
          failedSendVerificationEmailDialogOpen: true,
        });
      });
  };

  handleForgotPassword = state => {
    this.setState({
      forgotPasswordDialogOpen: state,
    });
  };

  render() {
    const { classes } = this.props;
    const {
      email,
      password,
      shouldRememberUser,
      signInError,
      verifyEmailError,
      forgotPasswordDialogOpen,
      failedSignInDialogOpen,
      verifyEmailDialogOpen,
      failedSendVerificationEmailDialogOpen,
    } = this.state;

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar} src={hknLogo} />
          <Typography component='h1' variant='h5'>
            Member Portal Login
          </Typography>
          <form className={classes.form} onSubmit={this.handleSignIn}>
            <FormControl margin='normal' required fullWidth>
              <InputLabel htmlFor='email'>Email Address</InputLabel>
              <Input
                id='email'
                name='email'
                autoComplete='email'
                autoFocus
                onChange={this.handleEmailChange}
                value={email}
              />
            </FormControl>
            <FormControl margin='normal' required fullWidth>
              <InputLabel htmlFor='password'>Password</InputLabel>
              <Input
                name='password'
                type='password'
                id='password'
                autoComplete='current-password'
                onChange={this.handlePasswordChange}
                value={password}
              />
            </FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  value='remember'
                  color='primary'
                  onChange={this.handleCheckRemember}
                  checked={shouldRememberUser}
                />
              }
              label='Remember me'
            />
            <Button
              size='small'
              variant='text'
              onClick={() => this.handleForgotPassword(true)}
              className={classes.forgotPassword}
            >
              Forgot password?
            </Button>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.signin}
            >
              Sign in
            </Button>
          </form>
        </Paper>
        <div className={classes.signupFooter}>
          <Typography component='p' style={{ display: 'inline-block' }}>
            Don&apos;t have an account?{' '}
            <Link to={ROUTES.SIGN_UP} className={classes.signupLink}>
              Sign up
            </Link>
          </Typography>
        </div>
        <Typography className={classes.footer} variant='caption' gutterBottom>
          <a
            className={classes.footerLink}
            href='http://hkn.ucsd.edu'
            target='_blank'
            rel='noopener noreferrer'
          >
            {' '}
            &copy; 2019 Eta Kappa Nu UCSD{' '}
          </a>
        </Typography>
        <div>
          {forgotPasswordDialogOpen && (
            <ForgotPassword handleClose={this.handleForgotPassword(false)} />
          )}
          <Dialog
            open={failedSignInDialogOpen}
            onClose={this.handleFailedSignInDialogClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            <DialogTitle id='alert-dialog-title'>Error</DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>
                {signInError ? signInError.message : ''}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={this.handleFailedSignInDialogClose}
                color='primary'
                autoFocus
              >
                GOT IT
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={verifyEmailDialogOpen}
            onClose={this.handleVerifyEmailDialogClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            <DialogTitle id='alert-dialog-title'>Welcome</DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>
                You must verify your email address before you can sign in. Press
                RESEND if you did not receive the verification email.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={this.handleResendVerificationEmail}
                color='primary'
              >
                RESEND
              </Button>
              <Button
                onClick={this.handleVerifyEmailDialogClose}
                color='primary'
                autoFocus
              >
                GOT IT
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={failedSendVerificationEmailDialogOpen}
            onClose={this.handleFailedSendVerificationEmailDialogClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            <DialogTitle id='alert-dialog-title'>Error</DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>
                {verifyEmailError
                  ? `${verifyEmailError.message}You can click RESEND below to resend the verification email. If this issue persists, please contact a HKN officer.`
                  : ''}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onCLick={this.handleResendVerificationEmail}
                color='primary'
              >
                RESEND
              </Button>
              <Button
                onClick={this.handleFailedSendVerificationEmailDialogClose}
                color='primary'
                autoFocus
              >
                GOT IT
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </main>
    );
  }
}

export default compose(
  withStyles(styles),
  withFirebase,
  withRouter
)(SignInPage);
