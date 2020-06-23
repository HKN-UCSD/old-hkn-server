import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper, Container, Button } from '@material-ui/core';

import Calendar from '../../components/Calendar';
import EventCard from '../../components/EventCard';
import EventList from '../../components/EventList';
import { getAllEvents } from '../../services/events';

import styles from './styles';

class CalendarPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      selectedEvent: null,
      view: 'calendar',
    };

    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;

    getAllEvents().then(events => {
      const calendarEvents = [];
      events.forEach(newEventParam => {
        // make a copy of the event
        const newEvent = Object.assign(newEventParam);

        // convert timestamp object to ISO time string
        newEvent.startDate = newEvent.startDate.toDate().toISOString();
        newEvent.endDate = newEvent.endDate.toDate().toISOString();

        newEvent.title = newEvent.name;
        newEvent.venue = newEvent.location;
        calendarEvents.push(newEvent);
      });
      if (this._isMounted) this.setState({ events: calendarEvents });
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  toggleView() {
    if (this._isMounted)
      this.setState(prevState => ({
        view: prevState.view === 'calendar' ? ' list' : 'calendar',
      }));
  }

  toggleEventClick(event) {
    const { selectedEvent } = this.state;
    if (selectedEvent != null && event.id === selectedEvent.id) {
      if (this._isMounted)
        this.setState({
          selectedEvent: null,
        });
    } else if (this._isMounted) this.setState({ selectedEvent: event });
  }

  render() {
    const { selectedEvent, events, view } = this.state;
    const { classes } = this.props;

    return (
      <Grid className={classes.root} container spacing={1}>
        <Grid container justify='flex-end'>
          <Button
            onClick={() => {
              this.toggleView();
            }}
          >
            {view === 'calendar' ? 'list View' : 'calendar view'}
          </Button>
        </Grid>

        <Grid item xs>
          <Paper>
            {view === 'calendar' ? (
              <Calendar
                events={events}
                handleEventClick={event => this.toggleEventClick(event)}
              />
            ) : (
              <EventList
                events={events}
                handleEventClick={event => this.toggleEventClick(event)}
              />
            )}
          </Paper>
        </Grid>
        {selectedEvent && (
          <Grid item xs={4}>
            <Container>
              <EventCard event={selectedEvent} />
            </Container>
          </Grid>
        )}
      </Grid>
    );
  }
}

export default withStyles(styles)(CalendarPage);
