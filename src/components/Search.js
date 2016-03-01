
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

  changeDate(change) {
    let newDate;
    if (change === 1) {
      newDate = moment(this.state.date).add(1, 'day');
    } else if (change === -1) {
      newDate = moment(this.state.date).subtract(1, 'day');
    } else {
      newDate = change;
    }
    this.setState({
      date: newDate,
    }, this.updateEvents);
  }

  updateEvents() {
    const cats = [];
    const testChecks = (cat) => {
      if (cat.checked) {
        cats.push(cat.value);
      }
    };
    testChecks(this.refs.music);
    testChecks(this.refs.singles);
    testChecks(this.refs.performing);
    const catStr = cats.join(',');
    const eventfulDate = this.state.date.format('YYYYMMDD00-YYYYMMDD00');
    this.props.loadEvents(this.refs.where.value, eventfulDate, catStr);
  }

  /*eslint-disable */
  render() {
    return (

      <div className="search">
        <div className="row topSearch">
          <div>
            <button className="dayButton col-md-1" onClick={() => this.changeDate(-1)}>&#9664;</button>
            <DatePicker
              selected={this.state.date} id="when"
              onChange={newDate => this.changeDate(newDate)}
            />
            <button className="col-md-1 dayButton" onClick={() => this.changeDate(1)}>&#9654;</button>
          </div>
          <div className="col-md-6 col-md-offset-4" id="location">
              <form onSubmit={() => this.updateEvents()}>
                <input type="text" ref="where" id="where" placeholder="Enter a location"/>
              </form>
          </div>
        </div>
        <div className="form-group row radio">
          <form action="">
            <div className="col-md-3">
            <input type="checkbox" defaultChecked name="music" value="music" ref="music"/> Concerts
            </div>
            <div className="col-md-3">
            <input type="checkbox" name="singles" value="singles_social" ref="singles"/> Nightlife
            </div>
            <div className="col-md-3">
            <input type="checkbox" name="performing_arts" value="performing_arts" ref="performing"/> Performing Arts
            </div>
          </form>
        </div>
      </div>
    );
  }
  /*eslint-enable */
}

Search.propTypes = {
  loadEvents: React.PropTypes.function,
};

export default Search;
