import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
// import {geolocated} from 'react-geolocated';
const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
  </GoogleMap>
))
// var yourLocation = { lat: 40.97, lng: 37.59 };
// var map;
// var marker;
// function geoFindMe() {
//
//   // const status = document.querySelector('#status');
//   // const mapLink = document.querySelector('#map-link');
//
//   // mapLink.href = '';
//   // mapLink.textContent = '';
//   function success(position) {
//       const latitude = position.coords.latitude;
//       const longitude = position.coords.longitude;
//       yourLocation = {lat: latitude, lng: longitude};
//       var dest = {lat: latitude-0.008, lng: longitude-0.008};
//
//        var request = {
//         origin:  new google.maps.LatLng(yourLocation),
//         destination: new google.maps.LatLng(dest),
//         travelMode: 'DRIVING'
//       };
//
//       directionsService.route(request, function(result, status) {
//         if (status == 'OK') {
//           var eta =result.routes[0].legs[0].duration.text;
//           addMarker(yourLocation, map, eta);
//           addMarker(dest, map, "restaurant");
//           map.panTo(yourLocation);
//           directionsDisplay.setDirections(result);
//         }
//       });
//   }
//
//
//
//   function error() {
//     status.textContent = 'Unable to retrieve your location';
//   }
//
//   if (!navigator.geolocation) {
//     status.textContent = 'Geolocation is not supported by your browser';
//   } else {
//     status.textContent = 'Locating…';
//     navigator.geolocation.getCurrentPosition(success, error);
//   }
//
// }
//
//
//
//   function addMarker(location, map, label) {
//     // Add the marker at the clicked location, and add the next-available label
//     // from the array of alphabetical characters.
//     var marker = new google.maps.Marker({
//       position: location,
//       label: label,
//       map: map
//     });
//   }
//
//
//
// function initialize() {
//     var bangalore = { lat: 12.97, lng: 77.59 };
//     map = new google.maps.Map(document.getElementById('map'), {
//       zoom: 12,
//       center: yourLocation
//     });
//
//     // This event listener calls addMarker() when the map is clicked.
//     google.maps.event.addListener(map, 'click', function(event) {
//       addMarker(event.latLng, map);
//     });
//
//     // Add a marker at the center of the map.
//     addMarker(bangalore, map);
//   }
class Map extends Component {

  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11

  };





  // nGoogleApiLoaded={({map, maps}) => this.renderMarkers(map, maps)};



  render() {

    return (
//         s
         <MyMapComponent
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />


    );
  }
}

export default Map;