import React, { Component } from 'react';
import mapStyles from '../config/mapStyles'

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: this.props.lat,
      lng: this.props.lng,
    };
  }

  componentDidMount() {
    this.renderMap();
  }

  getLatLng(props) { //eslint-disable-line
    return {
      lat: Number(props.parentState.lat),
      lng: Number(props.parentState.lng),
    };
  }

  getMap(myLatLng) {
    return new google.maps.Map(document.getElementById('map'), { //eslint-disable-line
      zoom: 13,
      center: myLatLng,
      mapTypeControl: false,
      styles: mapStyles,
    });
  }

  shouldComponentUpdate(nextProps) {
    const myLatLng = this.getLatLng(nextProps);
    const map = this.getMap(myLatLng);
    this.renderPins(nextProps.parentState.events, map);
    return true;
  }

  renderMap() {
    const myLatLng = this.getLatLng(this.props);
    this.getMap(myLatLng);
  }

  renderPins(events, map) {
    const pins = [];
    for (let i = 0; i < events.length; i++) {
      let description;
      if (events[i].description) {
        description = '<br><b>Description</b>: ' + events[i].description + '</p>'; //eslint-disable-line
      } else {
        description = '';
      }
      const contentString = '<h3>' + events[i].title + '</h3>' +//eslint-disable-line
                    '<h4><a href="' + events[i].url + '">Buy Tickets</a></h4>' +
                    '<br><b>Venue</b>: ' + events[i].venue_name +
                    description; //eslint-disable-line
      pins.push({
        latlon: new google.maps.LatLng(events[i].latitude, events[i].longitude), //eslint-disable-line
        message: new google.maps.InfoWindow({ //eslint-disable-line
          content: contentString,
          maxWidth: 275,
          maxHeight: 250,
        }),
        place: events.title,
        description: events.description,
      });
    }
    let bounds = new google.maps.LatLngBounds(); //eslint-disable-line
    let currentSelectedMarker;
    pins.forEach((pin) => { //eslint-disable-line
      let marker = new google.maps.Marker({ //eslint-disable-line
        position: pin.latlon,
        map: map, //eslint-disable-line
        title: 'Big Map',
        icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
      });

      if (marker.getVisible()) {
        bounds.extend(marker.getPosition());
      }

      // For each marker created, add a listener that checks for clicks
      google.maps.event.addListener(marker, 'click', function (){ //eslint-disable-line
        if (currentSelectedMarker) {
          currentSelectedMarker.message.close();
        }
        currentSelectedMarker = pin;
        pin.message.open(map, marker);
      });
    });
    map.fitBounds(bounds);
  }

  render() {
    return (
      <div className="col-xs-8 " id="map"> This div element contains map </div>
      );
  }
}

Map.propTypes = {
  lat: React.PropTypes.number,
  lng: React.PropTypes.number,
  parentState: React.PropTypes.object,
};


export default Map;
