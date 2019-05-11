
var yourLocation = { lat: 40.97, lng: 37.59 };
var map;
// In the following example, markers appear when the user clicks on the map.
  // Each marker is labeled with a single alphabetical character.
var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var labelIndex = 0;
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
  function addMarker(location, map) {
    // Add the marker at the clicked location, and add the next-available label
    // from the array of alphabetical characters.
    var marker = new google.maps.Marker({
      position: location,
      label: labels[labelIndex++ % labels.length],
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

var marker = new google.maps.Marker({
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
      addMarker(yourLocation, map);
      map.panTo(yourLocation);
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
//

