import React, {Component} from "react";

import { Map, GoogleApiWrapper } from 'google-maps-react';

    export class MapContainer extends Component{

    render(){

    const mapStyles = {
    width: '100%',
    height: '100%',
    };

    return (
       
        <>
            <div id="map" style={{height: "100px", width: "100px"}}>
            <Map
            google={this.props.gloogle}
            zoom={8}
            style={mapStyles}
            initialCenter={{ lat: 47.444, lng: -122.176}}
        />
            </div>
    
    </>
);
        }
    }
    export default GoogleApiWrapper({
  apiKey: 'AIzaSyCSYK0RCurfN-ZQqkmBMyE9PQ_0iSB_oT8'
})(MapContainer);