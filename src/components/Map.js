import React, { Component } from 'react';
// import initMap from '../../public/Helpers'

class Map extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const myLatLng = { lat: -25.363, lng: 131.044 };

    const map = new google.maps.Map(document.getElementById('map'), { //eslint-disable-line
      zoom: 4,
      center: myLatLng,
    });

    const marker = new google.maps.Marker({ //eslint-disable-line
      position: myLatLng,
      map: map, //eslint-disable-line
      title: 'Hello World!',
    });
  }

  render() {
    return (
      <div id="map"> This div element contains map </div>
      );
  }
}

export default Map;
