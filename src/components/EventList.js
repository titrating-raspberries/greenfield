import React, { Component } from 'react';
import Event from './event';

// takes in [{event},{event},{event}]

class EventList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="eventList">
        <Event />
        <Event />
        <Event />
      </section>
    );
  }
}

export default EventList;
