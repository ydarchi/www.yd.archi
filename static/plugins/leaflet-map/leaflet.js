var mymap = L.map('mapid', {scrollWheelZoom: false})
    .setView(
        [50.45966720581055, 3.9412269592285156],
        13
    );

L.tileLayer(
    'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
    {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox/dark-v10'
    }
    ).addTo(mymap);

L.marker([50.45966720581055, 3.9412269592285156])
    .addTo(mymap)
    .bindPopup("<b>YD Architecture</b>")
    .openPopup();
