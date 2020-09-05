import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Link,
} from '@material-ui/core';

const styles = () => ({
  root: {
    backgroundColor: grey[200],
  },
  title: {
    backgroundColor: grey[400],
  },
  list_item_text: {
    fontSize: '16px',
  },
});

function Links(props) {
  const { classes, urls } = props;
  const { fb, canva, rsvp, signin } = urls;

  // .map for list
  return (
    <div className={classes.root}>
      <Typography variant='h6' className={classes.title} align='center'>
        Links
      </Typography>

      <List dense>
        <ListItem className={classes.list_item}>
          <Link href={rsvp}>
            <ListItemText
              classes={{ primary: classes.list_item_text }}
              primary='RSVP'
            />
          </Link>
        </ListItem>
        <ListItem className={classes.list_item}>
          <Link href={signin}>
            <ListItemText
              classes={{ primary: classes.list_item_text }}
              primary='Sign In'
            />
          </Link>
        </ListItem>
        <ListItem className={classes.list_item}>
          <Link href={canva}>
            <ListItemText
              classes={{ primary: classes.list_item_text }}
              primary='Canva'
            />
          </Link>
        </ListItem>
        <ListItem className={classes.list_item}>
          <Link href={fb}>
            <ListItemText
              classes={{ primary: classes.list_item_text }}
              primary='Facebook'
            />
          </Link>
        </ListItem>
      </List>
    </div>
  );
}

Links.propTypes = {
  urls: PropTypes.shape({
    fb: PropTypes.string,
    canva: PropTypes.string,
    rsvp: PropTypes.string.isRequired,
    signin: PropTypes.string.isRequired,
  }),
};

Links.defaultProps = {
  urls: {
    fb: '',
    canva: '',
  },
};

export default withStyles(styles)(Links);
