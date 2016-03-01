/* eslint-disable react/jsx-no-bind */
import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment(),
    };
  }

  changeDate(newDate) {
    if(newDate === 1) {
      newDate = moment(this.state.date).add(1, 'day');
    } else if (newDate === -1) {
      newDate = moment(this.state.date).subtract(1, 'day');
    }
    this.setState({
      date: newDate
    }, this.updateEvents);
  }

  updateEvents() {
    let eventfulDate = this.state.date.format('YYYYMMDD00-YYYYMMDD00');
    this.props.loadEvents(this.refs.where.value, eventfulDate);
  }

  render() {
    return (
      <div className="search">
        <form id="where" onSubmit={() => this.updateEvents()}>
          <input type="text" ref="where" />
        </form>
        <div id="when">
          <button onClick={() => this.changeDate(-1)}>&#9664;</button>
          <DatePicker
            selected={this.state.date}
            onChange={newDate => this.changeDate(newDate)} />
          <button onClick={() => this.changeDate(1)}>&#9654;</button>
        </div>
      </div>
    );
  }
}

export default Search;
