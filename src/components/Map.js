import React, { Component } from "react";
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import '../css/Map.css';

 export class RenderMap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // recommendation: {name: "Oiji", latitude: "40.7273", longitude: "-73.9858"},
            // participants: [{name: "User 2", userId: "jjp2181@columbia.edu", address: "43-25 Hunter Street, Long Island City, NY, 11101", latlng: {lat: 40.7477419, lng: -73.9423707}}, {name: "User 3", userId: "pjs221@naver.com", address: "125 W 31st st, New York, NY, 10001", latlng: {lat: 40.7486596, lng: -73.9902115}}, {name: "User 1", userId: "jordanjpark@gmail.com", address: "99 John Street, New York, NY, 10038", latlng: {lat: 40.7083595, lng: -74.0060041}}]
            recommendation: this.props.recommendation,
            participants: this.props.participants
        };
    }

    render() {
        const DefaultMap = compose(
                withProps({
                    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBGCQae31kBA51sdMgem5Rh_moVP-XcPtY",
                    loadingElement: <div style={{ height: `100%` }} />,
                    containerElement: <div style={{ height: '70vh', width: '100%' }} />,
                    mapElement: <div style={{ height: `100%` }} />
                }),
                withScriptjs,
                withGoogleMap
            )((props) => (
            <GoogleMap
                defaultCenter = { { lat: parseFloat(this.props.recommendation.latitude),
                                  lng: parseFloat(this.props.recommendation.longitude) } }
                defaultZoom = { 13 }
            >
            <Marker
                key={99}
                position={ { lat: parseFloat(this.state.recommendation.latitude),
                    lng: parseFloat(this.state.recommendation.longitude) } }
                defaultAnimation={1}
                label={this.state.recommendation.name}
            />
            {this.state.participants.map((participant, index) => {
                let markerShape = {
                    coords: [25, 25, 25],
                    type: 'circle'
                };
                return (
                    <Marker
                        key={index}
                        position={{lat: parseFloat(participant.latlng.lat), lng: parseFloat(participant.latlng.lng) }}
                        label={participant.name}
                    />
                )
            })}
            </GoogleMap>
         ));

        return (
            <div className="DefaultMap">
                <h3>Here is our estimate for trips to {this.props.recommendation.name}:</h3>
                <DefaultMap />
            </div>
        )
    }
}
export default RenderMap;
