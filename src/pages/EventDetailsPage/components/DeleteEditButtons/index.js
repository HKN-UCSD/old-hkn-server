import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';

import { Button, ButtonWithConfirmationModal } from '@SharedComponents';
import * as ROUTES from '@Constants/routes';
import { deleteEvent } from '@Services/EventService';

const DeleteEditButtons = props => {
  const { eventId } = props;
  const history = useHistory();

  const handleDeleteEvent = eventToDeleteId => {
    deleteEvent(eventToDeleteId)
      .then(res => {
        return res;
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleConfirmDelete = () => {
    handleDeleteEvent(eventId);
  };

  const confirmButtonProps = {
    name: 'Yes',
    onClick: () => {
      handleConfirmDelete();
      history.push(ROUTES.CALENDAR);
    },
    primary: true,
    positive: true,
  };

  const cancelButtonProps = {
    name: 'No',
    primary: true,
    positive: true,
  };

  return (
    <Grid container justify='flex-end' spacing={1}>
      <Grid item>
        <ButtonWithConfirmationModal
          confirmationModalProps={{
            title: 'Delete this event?',
            content: 'Do you want to delete this event permanently?',
            confirmButtonProps,
            cancelButtonProps,
          }}
          name='Delete'
          primary
          negative
        />
      </Grid>

      <Grid item>
        <Button
          primary
          positive
          to={`/events/${eventId}/edit`}
          component={Link}
        >
          Edit
        </Button>
      </Grid>
    </Grid>
  );
};

DeleteEditButtons.propTypes = {
  eventId: PropTypes.number.isRequired,
};

export default DeleteEditButtons;
