var center = [3.9412269592285156, 50.45966720581055];
var popupContent = '<img src="/images/favicon.png"/>&nbsp;<b>Architecture</b><dl><dt>Contact</dt><dd><a href="mailto:info@yd.archi">info@yd.archi</a></dd><dt>Phone</dt><dd><a href="tel:+32488002674">+32 488 002 674</a></dd><dt>Facebook</dt><dd><a href="https://facebook.com/www.yd.archi">YD Architecture</a></dd></dl>';

const coordinates = {
  'type': 'geojson',
  'data': {
    'type': 'FeatureCollection',
    'features': [
      {
        'type': 'Feature',
        'properties': {
          'description': popupContent
        },
        'geometry': {
          'type': 'Point',
          'coordinates': center
        }
      },
    ]
  }
};

var latBounds = [-180, 180];
var lngBounds = [-90, 90];

var lat = Math.random() * (latBounds[1]- latBounds[0] + 1) + latBounds[0];
var lng = Math.random() * (lngBounds[1]- lngBounds[0] + 1) + lngBounds[0];

const map = new maplibregl.Map({
  container: "mapid",
  style: "https://geoserveis.icgc.cat/contextmaps/fulldark.json",
  center: [lat, lng],
  zoom: 6,
  pitch: 60,
  bearing: Math.floor(Math.random() * 360),
  attributionControl: false,
  antialias: true
});

/*
function rotateCamera(timestamp) {
  // clamp the rotation between 0 -360 degrees
  // Divide timestamp by 100 to slow rotation to ~10 degrees / sec
  map.rotateTo((timestamp / 1000) % 360, { duration: 0 });

  // Request the next frame of the animation.
  requestAnimationFrame(rotateCamera);
}
*/

map.addControl(new maplibregl.AttributionControl({
  compact: true,
  customAttribution: 'YD Architecture'
}));

map.addControl(new maplibregl.NavigationControl(
  {
    'visualizePitch': true,
    'showCompass': true,
    'showZoom': true
  }
));

map.addControl(new maplibregl.FullscreenControl());

map.addControl(
  new maplibregl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true
  })
);

var popup = new maplibregl.Popup({
    closeButton: false,
    closeOnClick: false,
    closeOnMove: false
  })
  .setLngLat(center)
  .setHTML(popupContent)
  .addTo(map);

  map.flyTo({
    zoom: 15,
    bearing: 0,
    pitch: 60,
    speed: 0.1,
    curve: 1,
    essential: true,
    center: center
  });

map.on('load', function () {
  map.addSource('places', coordinates);

  map.addLayer({
    'id': 'places',
    'type': 'circle',
    'source': 'places',
    'paint': {
      'circle-radius': 10,
      'circle-color': '#FF0000',
      'circle-stroke-color': 'white',
      'circle-stroke-width': 1,
      'circle-opacity': 0.5
    }
  });

  map.on('click', 'places', function (e) {
    map.flyTo({
      bearing: 0,
      speed: 0.1,
      curve: 1,
      essential: true,
      center: e.features[0].geometry.coordinates
    });
  });

  /*
  map.on('click', 'places', function (e) {
    var coordinates = e.features[0].geometry.coordinates.slice();
    var description = e.features[0].properties.description;

    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    new maplibregl.Popup({
      closeButton: false,
      closeOnClick: false,
      closeOnMove: false
    })
      .setLngLat(coordinates)
      .setHTML(description)
      .addTo(map);
  });

  map.on('mouseenter', 'places', function () {
    map.getCanvas().style.cursor = 'pointer';
  });

  map.on('mouseleave', 'places', function () {
    map.getCanvas().style.cursor = '';
  });
  */
});

