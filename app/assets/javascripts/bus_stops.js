function loadBusStopsChart () {
  var data = gon.bus_stops;

  // Chart size and margins
  var margin = {top: 20, right: 30, bottom: 30, left: 40},
      width = data.length*10 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  // Scale y axis on data size (map domain values to range values)
  var y = d3.scale.linear()
      .domain([0, d3.max(data, function(d) { return d.boardings + 25; })]) // add a little spacing at the top
      .range([height, 0]); // reversed for SVG (from upper-left)
  // Chart axis (y range)
  var yAxis = d3.svg.axis()
      .scale(y)
      .orient('left');

  // Scale x axis for chart axis
  var x = d3.scale.ordinal()
      .domain(data.map(function(d) { return d.on_street + ' and ' + d.cross_street; }))
      .rangeRoundBands([0, width], 0.1); // .1 for padding
  // Chart axis (x range)
  var xAxis = d3.svg.axis()
      .scale(x)
      .orient('bottom');

  // Create chart (margins inherited down the line)
  var chart = d3.select('.chart')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  chart.append('g') // Chart x axis
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')') // from upper-left
      .call(xAxis);

  chart.append('g') // Chart y axis
      .attr('class', 'y axis')
      .call(yAxis)
      .append('text') // Axis label
      .attr('class', 'axis-label rotate')
      .attr('y', 13)
      .text('Boardings');

  // Append svg g tags for each element in data, spread out by x.rangeBand() on x, y = 0
  var bar = chart.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      // .attr('transform', function(d) { return 'translate(' + x(d.on_street + ' and ' + d.cross_street) + ', 0)'; });
      .attr('class', 'bar')
      .attr('x', function (d) { return x(d.on_street + ' and ' + d.cross_street); })

  // bar.append('rect') // SVG positions from upper left (not so easy)
      .attr('y', function(d) { return y(d.boardings); }) // Set y pos based on data size
      .attr('height', function(d) { return height - y(d.boardings); }) // chart height minus data height
      .attr('width', x.rangeBand());

  bar.append('text')
      .attr('y', function(d) { return y(d.boardings) - 10; })
      .attr('x', x.rangeBand() / 2)
      .text(function(d) { return d.boardings; });
}

if (window.location.pathname === '/bus_stops/chart') window.addEventListener('load', loadBusStopsChart);
