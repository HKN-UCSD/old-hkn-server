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
      await doSignInWithEmailAndPassword(email, password, false);
      await doSendVerificationEmail();
      await doSignOut();

      setSubmitting(false);
    } catch {
      // TODO: Let user know that an account has already been made with the email they provided
      setSubmitting(false);
    }
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
