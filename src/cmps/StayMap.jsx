import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

class _StayMap extends Component {
  state = {
    center: {
      lat: null,
      lng: null,
      address: null,
    },
    isInfoWindowOn: true,
  };

  componentDidMount() {
    const center = this.props.location;
    this.setState({ center });
  }

  render() {
    const { center } = this.state;
    if (!center) return <div>Loading...</div>;
    return (
      <div className='stay-map'>
        <h3>{center.address}</h3>

        <Map
          google={this.props.google}
          zoom={5}
          initialCenter={center}
          center={center}
          style={{ width: '100%' }}
        >
          <Marker
            position={center}
            name={'Current Location'}
            onClick={this.onMarkerClicked}
          />

          <InfoWindow
            // onClose={this.onInfoWindowClose}
            position={center}
            visible={this.state.isInfoWindowOn}
          >
            <div>
              <h1>Your next trip is here!</h1>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export const StayMap = GoogleApiWrapper({
  apiKey: 'AIzaSyBcHbsl6HTfMsdpKO2d3xY9UYQdF4BIUG4',
})(_StayMap);
