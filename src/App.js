import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Map from './components/Map';
import Search from './components/Search';
import Key from './config/apikeys';
import searchEventful from './lib/searchEventful';
import EventList from './components/EventList'

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapOptions: {
        center: { lat: 37.7833, lng: 122.4167 },
        zoom: 3,
      },
      map: null,
      data: 'temporary',
    };
  }

  getQuery(zip, start, end) {
    var dateRange = start + '00-';
    if (!end) {
      dateRange= dateRange + start + '00';
      console.log(dateRange);
    } else {
      dateRange = dateRange + end + '00';
      console.log(dateRange);
    }
    var options = {
      app_key: Key.eventful,
      location: zip,
      category: 'music',
      page_size: 20,
      date: dateRange,
    };
    var data = searchEventful(options, function(results) {
      console.log('date is ', options.date);
      this.setState({ data: results });
      console.log('state data is ', this.state.data);
    }.bind(this));
  }


  render() {
    return (
      <container>
        <h1> JAMBOREE </h1>
        <Search getQuery={ this.getQuery.bind(this) } />
        <br/><br/>
        <Map props={ this.state }/>
        <br/>
        <EventList />
      </container>
    );
  }

}

ReactDOM.render(<App />, document.getElementById('app'));
