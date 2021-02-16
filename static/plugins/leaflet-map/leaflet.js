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

var popupContent = '<b>YD Architecture</b><dl><dt>Contact</dt><dd><a href="mailto:info@yd.archi">info@yd.archi</a></dd><dt>Phone</dt><dd><a href="tel:+32488002674">+32 488 002 674</a></dd><dt>Facebook</dt><dd><a href="https://facebook.com/www.yd.archi">Facebook page</a></dd></dl>';
var popup = L.popup(
  {
  closeOnClick: false,
  autoClose: false,
  closeButton: false
}
).setContent(popupContent);

L.marker([50.45966720581055, 3.9412269592285156])
    .addTo(mymap)
    .bindPopup(popup)
    .openPopup();
