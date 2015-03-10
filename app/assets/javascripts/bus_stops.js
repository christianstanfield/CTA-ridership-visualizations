function loadBusStopsChart () {
  var data = gon.bus_stops;

  // Chart size and margins
  var chartHeight = data.length*30,
      chartWidth = 900,
      margin = {top: 20, right: 30, bottom: 30, left: 300},
      marginWidth = chartWidth - margin.left - margin.right,
      marginHeight = chartHeight - margin.top - margin.bottom;

  // Scale x axis for chart axis (map domain values to range values)
  var x = d3.scale.linear()
      .domain([0, d3.max(data, function(d) { return d.boardings; })])
      .range([0, marginWidth]);
  // Chart axis
  var xAxis = d3.svg.axis()
      .scale(x)
      .orient('top');

  // Scale y axis
  var y = d3.scale.ordinal()
      .domain(data.map(function(d) { return d.on_street + ' and ' + d.cross_street; }))
      .rangeRoundBands([0, marginHeight], 0.1); // .1 for padding
  // Chart axis
  var yAxis = d3.svg.axis()
      .scale(y)
      .orient('left');

  // Create chart
  var chart = d3.select('.chart')
      .attr('width', chartWidth)
      .attr('height', chartHeight)
      .append('g') // group tag for margins
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  chart.append('g') // Chart x axis
      .attr('class', 'x axis')
      .call(xAxis)
      .append('text') // Axis label
      .attr('class', 'axis-label')
      .attr('y', 13)
      .attr('x', marginWidth)
      .text('Boardings');

  chart.append('g') // Chart y axis
      .attr('class', 'y axis')
      .call(yAxis);

  // Create bars
  var bar = chart.selectAll('rect')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('y', function (d) { return y(d.on_street + ' and ' + d.cross_street); })
      .attr('x', 0)
      .attr('width', function(d) { return x(d.boardings); })
      .attr('height', y.rangeBand());

  bar.append('text')
      .attr('y', function (d) { return y(d.on_street + ' and ' + d.cross_street); })
      .attr('x', function(d) { return x(d.boardings) + 10; })
      .text(function(d) { return d.boardings; });
}

if (window.location.pathname === '/bus_stops/chart') window.addEventListener('load', loadBusStopsChart);
