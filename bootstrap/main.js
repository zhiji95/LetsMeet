
var yourLocation = { lat: 40.97, lng: 37.59 };
var map;
var marker;
// In the following example, markers appear when the user clicks on the map.
  // Each marker is labeled with a single alphabetical character.
var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var labelIndex = 0;
var directionsService = new google.maps.DirectionsService();
var directionsDisplay = new google.maps.DirectionsRenderer();
  function initialize() {
    var bangalore = { lat: 12.97, lng: 77.59 };
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: yourLocation
    });

    // This event listener calls addMarker() when the map is clicked.
    google.maps.event.addListener(map, 'click', function(event) {
      addMarker(event.latLng, map);
    });

    // Add a marker at the center of the map.
    addMarker(bangalore, map);
  }

  // Adds a marker to the map.
  function addMarker(location, map, label) {
    // Add the marker at the clicked location, and add the next-available label
    // from the array of alphabetical characters.
    var marker = new google.maps.Marker({
      position: location,
      label: label,
      map: map
    });
  }
// console.log("initializing");
google.maps.event.addDomListener(window, 'load', initialize);
// console.log("initialized");
document.getElementById('find-me').addEventListener('click', geoFindMe);
// document.querySelector('#find-me').addEventListener('click', geoFindMe);

// In the following example, markers appear when the user clicks on the map.
// Each marker is labeled with a single alphabetical character.
// var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
// var labelIndex = 0;
//
// function initialize() {
//     var yourLocation;
//     var user1 = { lat: 30.99, lng: 120.99 };
//     var user2 = { lat: 30.01, lng: 120.99 };
//     var map = new google.maps.Map(document.getElementById('map'), {
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
//
//
//     addMarker(user1, map);
//     addMarker(user2, map);
// }
//
// // Adds a marker to the map.
// function addMarker(location, map) {
// // Add the marker at the clicked location, and add the next-available label
// // from the array of alphabetical characters.
// var marker = new google.maps.Marker({
//   position: location,
//   label: labels[labelIndex++ % labels.length],
//   map: map
// });
// }
function addYourMarker(location, map) {
// Add the marker at the clicked location, and add the next-available label
// from the array of alphabetical characters.
  var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';

  marker = new google.maps.Marker({
    position: location,
    label: labels[labelIndex++ % labels.length],
    map: map,
    title: "YOU!",
      icon: image
  });
}
function geoFindMe() {

  // const status = document.querySelector('#status');
  // const mapLink = document.querySelector('#map-link');

  // mapLink.href = '';
  // mapLink.textContent = '';
  function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      yourLocation = {lat: latitude, lng: longitude};
      var dest = {lat: latitude-0.008, lng: longitude-0.008};

       var request = {
        origin:  new google.maps.LatLng(yourLocation),
        destination: new google.maps.LatLng(dest),
        travelMode: 'DRIVING'
      };

      directionsService.route(request, function(result, status) {
        if (status == 'OK') {
          var eta =result.routes[0].legs[0].duration.text;
          addMarker(yourLocation, map, eta);
          addMarker(dest, map, "restaurant");
          map.panTo(yourLocation);
          directionsDisplay.setDirections(result);
        }
      });
  }



  function error() {
    status.textContent = 'Unable to retrieve your location';
  }

  if (!navigator.geolocation) {
    status.textContent = 'Geolocation is not supported by your browser';
  } else {
    status.textContent = 'Locating…';
    navigator.geolocation.getCurrentPosition(success, error);
  }

}

