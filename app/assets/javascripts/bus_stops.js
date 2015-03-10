function loadBusStopsChart () {
  var data = gon.bus_stops;

  // Chart size
  var width = 960,
      height = 500,
      barWidth = width / data.length; // Scale on data size

  // Scale y axis on data size (map domain values to range values)
  var y = d3.scale.linear()
      .domain([0, d3.max(data, function(d) { return d.boardings + 10; })]) // add a little spacing at the top for numbers above bars
      .range([height, 0]); // reversed for SVG

  // Create chart (nice and easy)
  var chart = d3.select('.chart')
      .attr('width', width)
      .attr('height', height);

  // Append svg g tags for each element in data, spread out by barWidth on x, y = 0
  var bar = chart.selectAll('g')
      .data(data)
      .enter().append('g')
      .attr('transform', function(d, i) { return 'translate(' + i * barWidth + ', 0)'; });

  bar.append('rect') // SVG positions from upper left (not so easy)
      .attr('y', function(d) { return y(d.boardings); }) // Set y pos based on data size
      .attr('height', function(d) { return height - y(d.boardings); }) // chart height minus data height
      .attr('width', barWidth - 1); // Subtract 1 pixel for padding

  bar.append('text')
      .attr('y', function(d) { return y(d.boardings) - 10; })
      .attr('x', barWidth / 2)
      .text(function(d) { return d.boardings; });
}

if (window.location.pathname === '/bus_stops/chart') window.addEventListener('load', loadBusStopsChart);
