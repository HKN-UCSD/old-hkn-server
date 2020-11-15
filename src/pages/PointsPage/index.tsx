import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Grid } from '@material-ui/core';

import { PointDisplay } from './components/PointDisplay';
import useStyles from './styles';

import { getInductionPoints } from '@Services/UserService';
import { AppUserInducteePointsResponse } from '@Services/api';
import { UserContext } from '@Contexts';
import { CURR_USER_ID_ALIAS } from '@Constants/routes';

interface EventID {
  id: string;
}

export default function PointsPage() {
  const { id } = useParams<EventID>();
  const userContext = useContext(UserContext);
  const [pointObj, setPointObj] = useState<
    AppUserInducteePointsResponse | undefined
  >(undefined);
  const classes = useStyles();

  useEffect(() => {
    const getPointsFunc = async () => {
      if (userContext == null) {
        return;
      }

      const { userId } = userContext;
      const currUserId: number =
        id === CURR_USER_ID_ALIAS ? parseInt(userId, 10) : parseInt(id, 10);
      const response: AppUserInducteePointsResponse = await getInductionPoints(
        currUserId
      );
      console.log(response);
      setPointObj(response);
    };
    getPointsFunc();
  }, [id, userContext]);

  if (pointObj === undefined) {
    return <></>;
  }

  const {
    points,
    hasMentorshipRequirement,
    hasProfessionalRequirement,
    attendance,
  } = pointObj;

  return (
    <div className={classes.root}>
      <div className={classes.contentWrapper}>
        <div style={{ margin: '20px' }}>
          <h2>Inductee Points</h2>
          <Grid container justify='space-between' spacing={3}>
            <Grid item>
              <h3>Total Inductee Points: {points}</h3>
            </Grid>
            <Grid item>
              <h3>
                Mentor Point:{' '}
                {hasMentorshipRequirement ? `Complete` : `Incomplete`}
              </h3>
            </Grid>
            <Grid item>
              <h3>
                Professional Requirement:{' '}
                {hasProfessionalRequirement ? `Complete` : `Incomplete`}
              </h3>
            </Grid>
          </Grid>
          <PointDisplay attendances={attendance} />
        </div>
      </div>
    </div>
  );
}
