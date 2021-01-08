import React from 'react';
import { useParams } from 'react-router';
import { Avatar, Typography, Grid } from '@material-ui/core';

import EventSignInForm from './components/EventSignInForm';
import useStyles from './styles';

import { useRequest } from '@Hooks';
import HKN_TRIDENT_LOGO from '@Images/hkn-trident.png';
import { Loading, Card, PublicPageLayout } from '@SharedComponents';
import { getEventById, signInToEvent } from '@Services/EventService';

interface ParamTypes {
  id: string;
}

function EventSignInPage(): JSX.Element {
  const { id } = useParams<ParamTypes>();
  const eventID = parseInt(id, 10);
  const classes = useStyles();

  const { data: event, isLoading, error } = useRequest(() =>
    getEventById(eventID)
  );

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    console.log('do something here');
  }

  return (
    <PublicPageLayout>
      <Card className={classes.eventSignInCard}>
        <Grid container direction='column' alignItems='center' spacing={3}>
          <Grid item>
            <Grid container direction='column' alignItems='center' spacing={3}>
              <Grid item>
                <Avatar className={classes.logo} src={HKN_TRIDENT_LOGO} />
              </Grid>

              <Grid item>
                <Typography
                  className={classes.eventName}
                  variant='h5'
                  align='center'
                >
                  {event.name}
                </Typography>
              </Grid>

              <Grid item>
                <Typography variant='h6'>Event Sign In</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <EventSignInForm
              handleSubmit={values => signInToEvent(eventID, values)}
            />
          </Grid>
        </Grid>
      </Card>
    </PublicPageLayout>
  );
}

export default EventSignInPage;
