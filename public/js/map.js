mapboxgl.accessToken =
  'pk.eyJ1IjoiYW5hZ2gwNyIsImEiOiJjazl2MjFnbGIwODNzM251bDZxeGc5eTg5In0.uKasHMoIgUruj9T0Ox4Zpg';
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  zoom: 12,
  center: [-73.587159, 45.496024],
});

function addLocation(location) {
//   console.log(location);
  var marker = new mapboxgl.Marker().setLngLat(location).addTo(map);
}

// Fetch data from api
var getStores;
(getStores = async () => {
  const res = await fetch('/api/stores');
  const data = await res.json();

  const locations = data.data.map((location) => {
    const long_lat = [
      location.location.coordinates[1],
      location.location.coordinates[0],
    ];
    addLocation(long_lat);
  });
})();
