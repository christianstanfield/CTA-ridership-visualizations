function loadBusStopsMap() {

  var map = new google.maps.Map(document.getElementById('map-canvas'),
    { zoom: 11,
      center: new google.maps.LatLng(41.881832, -87.623177)
    });

  var bus_stop = gon.bus_stops.pop(); // this works but the for loop is sending too many requests
  // for (var bus_stop in gon.bus_stops) {

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
  // }
}

if (window.location.pathname === '/bus_stops/map') google.maps.event.addDomListener(window, 'load', loadBusStopsMap);
