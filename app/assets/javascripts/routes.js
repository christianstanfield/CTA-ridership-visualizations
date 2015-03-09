function loadRouteMap() {

  // Map
  var map = new google.maps.Map(document.getElementById('map-canvas'),
    { zoom: 11,
      center: new google.maps.LatLng(41.881832, -87.623177)
    });
  var mapZoom = 11; // for adjusting circle radius on zoom

  // Circles
  var circles = [];

  for (var i = 0; i < gon.bus_stops.length; i++) {
    var bus_stop = gon.bus_stops[i];

    var circleOptions = {
      // strokeColor: '#FF0000',
      // strokeOpacity: 0.8,
      strokeWeight: 0,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: map,
      center: new google.maps.LatLng(bus_stop.latitude, bus_stop.longitude),
      radius: bus_stop.boardings
    };

    circles.push(new google.maps.Circle(circleOptions));
  }

  // update circles' radius on zoom
  google.maps.event.addListener(map, 'zoom_changed', function() {
    var newRadius;

    if (map.zoom > mapZoom) {
      newRadius = 0.5;
      mapZoom = map.zoom;
    } else {
      newRadius = 2;
      mapZoom = map.zoom;
    }

    for (var i = 0; i < circles.length; i++) {
      circles[i].setRadius(circles[i].radius * newRadius);
    }
  });
}

if (window.location.pathname === '/routes/' + gon.route.id) google.maps.event.addDomListener(window, 'load', loadRouteMap);
