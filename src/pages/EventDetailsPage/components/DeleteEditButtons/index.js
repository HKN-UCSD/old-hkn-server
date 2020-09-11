import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import styles from './styles';

import { Button, ButtonWithConfirmationModal } from '@SharedComponents';
import * as ROUTES from '@Constants/routes';
import { deleteEvent } from '@Services/EventService';

const DeleteEditButtons = props => {
  const { classes, eventId } = props;
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
    actionCallback: () => {
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
    <div className={classes.root}>
      <ButtonWithConfirmationModal
        modalTitle='Delete this event?'
        modalContentText='Do you want to delete this event permanently?'
        name='Delete'
        confirmButtonProps={confirmButtonProps}
        cancelButtonProps={cancelButtonProps}
        startIcon={<DeleteIcon />}
        primary
        negative
      />

      <Button
        className={classes.edit}
        variant='contained'
        color='primary'
        to={`/events/${eventId}/edit`}
        component={Link}
        startIcon={<EditIcon />}
      >
        Edit
      </Button>
    </div>
  );
};

DeleteEditButtons.propTypes = {
  eventId: PropTypes.number.isRequired,
};

export default withStyles(styles)(DeleteEditButtons);
