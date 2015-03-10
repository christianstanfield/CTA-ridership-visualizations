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
    var busStop = gon.bus_stops[i];

    var circleOptions = {
      strokeWeight: 0,
      fillColor: 'blue',
      fillOpacity: 0.35,
      map: map,
      center: new google.maps.LatLng(busStop.latitude, busStop.longitude),
      radius: busStop.boardings
    };

    var circle = new google.maps.Circle(circleOptions);

    // InfoWindows
    (function(circle, busStop) {
      google.maps.event.addListener(circle, 'click', function () {

        var contentString = '<p>' + busStop.on_street + ' and ' + busStop.cross_street + '</p>' +
                            '<p>Boardings: ' + busStop.boardings + '</p>';

        var infowindow = new google.maps.InfoWindow({
          content: contentString,
          position: circle.center
        });

        infowindow.open(map);
      });
    })(circle, busStop);

    circles.push(circle);
  }

  // update circles' radius on zoom
  google.maps.event.addListener(map, 'zoom_changed', function () {
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
