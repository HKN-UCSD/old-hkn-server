import React from 'react';
import PropTypes from 'prop-types';
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
    buttonName: 'Yes',
    actionFunc: handleConfirmDelete,
    styleProps: {
      primary: true,
      positive: true,
    },
    urlToNavigate: ROUTES.CALENDAR,
  };

  const cancelButtonProps = {
    buttonName: 'No',
    styleProps: {
      primary: true,
      negative: true,
    },
  };

  return (
    <div className={classes.root}>
      <ButtonWithConfirmationModal
        modalTitle='Delete this event?'
        modalContentText='Do you want to delete this event permanently?'
        confirmButtonProps={confirmButtonProps}
        cancelButtonProps={cancelButtonProps}
        name='Delete'
        openButtonStyleProps={{
          startIcon: <DeleteIcon />,
          primary: true,
          negative: true,
        }}
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
