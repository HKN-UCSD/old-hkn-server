import React from 'react';
import { Avatar, Card, Grid, CardContent } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import SignUpForm from './components/SignUpForm';
import styles from './styles';

import HKN_TRIDENT_LOGO from '@Images/hkn-trident.png';
import { PublicPageLayout } from '@SharedComponents/layouts';
import { createNewUser } from '@Services/AuthService';
import {
  doSignInWithEmailAndPassword,
  doSendVerificationEmail,
  doSignOut,
} from '@Services/auth';

const INITIAL_STATE = {};

class SignUpPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  handleSubmit = async (values, setSubmitting) => {
    const { email, firstName, lastName, major, gradYear, password } = values;
    const signupSubmission = {
      email,
      firstName,
      lastName,
      major,
      password,
      graduationYear: gradYear.toString(),
    };

    try {
      await createNewUser(signupSubmission);
    } catch {
      console.log('Create new user failed');
      setSubmitting(false);
      return;
    }

    try {
      await doSignInWithEmailAndPassword(email, password, false);
    } catch {
      console.log('Sign in failed');
      setSubmitting(false);
      return;
    }

    try {
      await doSendVerificationEmail();
    } catch {
      console.log('Send verification email failed.');
    }

    await doSignOut();
    setSubmitting(false);
  };

  render() {
    const { classes } = this.props;

    return (
      <PublicPageLayout>
        <Card elevation={3} className={classes.card}>
          <CardContent>
            <Grid
              container
              className={classes.cardContent}
              alignItems='center'
              direction='column'
              spacing={2}
            >
              <Grid item>
                <Avatar className={classes.logo} src={HKN_TRIDENT_LOGO} />
              </Grid>
              <Grid item>
                <SignUpForm handleSubmit={this.handleSubmit} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </PublicPageLayout>
    );
  }
}

export default withStyles(styles)(SignUpPage);
