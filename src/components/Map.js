/* global google */

import React, { Component } from "react";
import { compose, withProps, lifecycle } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from 'react-google-maps'
import '../css/Map.css';

 export class RenderMap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            me: {lat: 40.7486596, lng: -73.9902115},
            loggedOnUser: "pjs221@naver.com",
            recommendation: {name: "Oiji", latitude: "40.7273", longitude: "-73.9858"},
            participants: [{name: "User 2", userId: "jjp2181@columbia.edu", address: "43-25 Hunter Street, Long Island City, NY, 11101", latlng: {lat: 40.7477419, lng: -73.9423707}}, {name: "User 3", userId: "pjs221@naver.com", address: "125 W 31st st, New York, NY, 10001", latlng: {lat: 40.7486596, lng: -73.9902115}}, {name: "User 1", userId: "jordanjpark@gmail.com", address: "99 John Street, New York, NY, 10038", latlng: {lat: 40.7083595, lng: -74.0060041}}],
            directions: null,
            estimates: [],
            // recommendation: this.props.recommendation,
            // participants: this.props.participants,
            // loggedOnUser: this.props.loggedOnUser,

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
                withGoogleMap,
                lifecycle({
                    componentDidMount: () => {
                        const DirectionsService = new google.maps.DirectionsService();

                        let mylat = '';
                        let mylng = '';

                        this.state.participants.forEach(participant => {
                            if (this.state.loggedOnUser === participant.userId) {
                                mylat = participant.latlng.lat
                                mylng = participant.latlng.lng
                            }
                                DirectionsService.route({
                                    origin: new google.maps.LatLng(participant.latlng.lat, participant.latlng.lng),
                                    destination: new google.maps.LatLng(parseFloat(this.state.recommendation.latitude), parseFloat(this.state.recommendation.longitude)),
                                    travelMode: google.maps.TravelMode.DRIVING,
                                }, (result, status) => {
                                    if (status === google.maps.DirectionsStatus.OK) {
                                        const entry = {name: participant.name,
                                                        distance: result.routes[0].legs[0].distance.text,
                                                        time: result.routes[0].legs[0].duration.text}
                                        if (this.state.estimates.length <= this.state.participants.length - 1) {
                                            this.setState({ estimates: [...this.state.estimates, entry] });
                                        }
                                    } else {
                                        console.error(`error fetching directions ${result}`);
                                    }
                                });

                        });

                        DirectionsService.route({
                            origin: new google.maps.LatLng(mylat, mylng),
                            destination: new google.maps.LatLng(parseFloat(this.state.recommendation.latitude), parseFloat(this.state.recommendation.longitude)),
                            travelMode: google.maps.TravelMode.DRIVING,
                        }, (result, status) => {
                            if (status === google.maps.DirectionsStatus.OK) {
                                this.setState({
                                    directions: result,
                                });
                            } else {
                                console.error(`error fetching directions ${result}`);
                            }
                        });
                    }
                })
                )((props) => (
            <GoogleMap
                defaultCenter = { { lat: parseFloat(this.state.recommendation.latitude),
                                  lng: parseFloat(this.state.recommendation.longitude) } }
                defaultZoom = { 12 }
            >
            {this.state.directions && <DirectionsRenderer directions={this.state.directions} />}
            <Marker
                key={99}
                position={ { lat: parseFloat(this.state.recommendation.latitude),
                    lng: parseFloat(this.state.recommendation.longitude) } }
                label={this.state.recommendation.name}
            />
            {this.state.participants.map((participant, index) => {
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

        // console.log('END', this.state.estimates);

        return (
            <div className="DefaultMap">
                <h3>Here is our estimate for trips to {this.state.recommendation.name}:</h3>
                <div className="Estimates">
                    {this.state.estimates.map((user, index) =>
                        <h4>{user.name}: {user.distance} - {user.time}</h4>
                    )}
                </div>
                <DefaultMap />
            </div>
        )
    }
}
export default RenderMap;
