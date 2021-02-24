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
          'coordinates': [3.9412269592285156, 50.45966720581055]

        }
      },
    ]
  }
};

const map = new maplibregl.Map({
  container: "mapid",
  style: "https://geoserveis.icgc.cat/contextmaps/fulldark.json",
  center: [3.9412269592285156, 50.45966720581055],
  zoom: 4,
  pitch: 60,
  bearing: -90,
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
  .setLngLat([3.9412269592285156, 50.45966720581055])
  .setHTML(popupContent)
  .addTo(map);

map.on('load', function () {
  //rotateCamera(0);

  map.flyTo({
    zoom: 15,
    bearing: 0,
    speed: 0.1,
    curve: 1,
    easing: function (t) {
      return t;
    },
    essential: true
  });

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
       // These options control the ending camera position: centered at
    // the target, at zoom level 9, and north up.
    bearing: 0,

    // These options control the flight curve, making it move
    // slowly and zoom out almost completely before starting
    // to pan.
    speed: 0.2, // make the flying slow
    curve: 2, // change the speed at which it zooms out

    // This can be any easing function: it takes a number between
    // 0 and 1 and returns another number between 0 and 1.
    easing: function (t) {
      return t;
    },

    // this animation is considered essential with respect to prefers-reduced-motion
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

