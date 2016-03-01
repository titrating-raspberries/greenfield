import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Map from './components/Map';
import Search from './components/Search';
import EventList from './components/EventList';
import Banner from './components/Banner';
import $ from 'jquery';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      events: [],
      // events[i].(latitude, longitude, title,  venue_ name,
      // venue_address, venue_url, url, city_name, region_abbr)
      lat: 37.7833,
      lng: -122.4167,
      fail: false,
    };
  }

  loadEvents(city, when) {
    const options = {
      where: city,
      q: 'music',
      page_size: 20,
      sort_order: 'popularity',
      date: when,
      within: 10,
      units: 'miles',
    };

    $.ajax({
      url: '/api/events/getList',
      type: 'GET',
      data: options,
      contentType: 'application/json',
      success: (data) => {
        this.setState({ fail: false });
        console.log('call to server successful');
        // console.log(data);
        if (data) {
          const eventList = data;
          this.setState({ events: eventList });
          this.setState({
            lat: eventList[Math.floor(eventList.length / 2)].latitude,
            lng: eventList[Math.floor(eventList.length / 2)].longitude,
          });
        } else {
          this.setState({ fail: true });
        }
      },
      error: (data) => {
        console.error('server AJAX failed to GET');
        console.log('problem is ', JSON.parse(data.responseText));
        console.log(JSON.parse(data.responseText));
      },
    });
  }

  /*eslint-disable */
  render() {
    return (
      <container>
        <Banner />
        <div className="app">
          <a name="mainApp"/>
          <Search loadEvents={ this.loadEvents.bind(this) } />
          <br/>
          <br/>
          <div className="col-xs-12">
          <h4 className="mapError">{ this.state.fail ? 'There are no events for this time and place. Please try again' : ''}</h4>
            <Map parentState={ this.state } />
            <EventList data={ this.state.events } />
          </div>
        </div>
      </container>
    );
  }
  /*eslint-enable */
}

ReactDOM.render(<App />, document.getElementById('app'));
