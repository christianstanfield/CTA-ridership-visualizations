function loadRouteMap() {

  // Map
  var map = new google.maps.Map(document.getElementById('map-canvas'),
    { zoom: 11,
      center: new google.maps.LatLng(41.881832, -87.623177)
    });

  // Circles
  for (var i = 0; i < gon.bus_stops.length; i++) {
    var bus_stop = gon.bus_stops[i];

    var circleOptions = {
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: map,
      center: new google.maps.LatLng(bus_stop.latitude, bus_stop.longitude),
      radius: bus_stop.boardings
    };

    var cityCircle = new google.maps.Circle(circleOptions);
  }
}

if (window.location.pathname === '/routes/' + gon.route.id) google.maps.event.addDomListener(window, 'load', loadRouteMap);
