import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Polyline } from 'google-maps-react';
import _ from  "lodash"

const GMAPS_API_KEY = 'noodles'
const mapStyles = {
  width: '100%',
  height: '600px',
  position: 'relative'
};

export class MapContainer extends Component {

colorByRoadAngle(angle) {
    return angle > 0 ? "#FF0000" : "#0000FF"
}

lines() {
    const points = _.get(this, 'props.drivingRoute.points', null)
    let lines = []

    for (let i = 0; i < points.length; i++) {
        const point = points[i];
        const nextPoint = points[i+1];
    
        if(point && nextPoint) {

            const path = [
                {lat: point.lat, lng: point.lng},
                {lat: nextPoint.lat, lng: nextPoint.lng}
            ]

            const line = <Polyline
                key={JSON.stringify({path})}
                path={path}
                strokeColor={this.colorByRoadAngle(point.roadAngle)}
                strokeOpacity={0.8}
                strokeWeight={4} />
            
            lines.push(line)
        }
    }

    return lines
}

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={
          {
            lat: _.get(this, 'props.drivingRoute.start.lat', null),
            lng: _.get(this, 'props.drivingRoute.start.lng', null)
          }
        }>

        { this.lines() }

      </Map>
    );
  }
}

export default GoogleApiWrapper({
    apiKey: GMAPS_API_KEY
})(MapContainer);
