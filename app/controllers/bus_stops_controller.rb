class BusStopsController < ApplicationController

  def index
    @bus_stops = BusStop.order_by_routes
  end

  def chart
    gon.bus_stops = BusStop.limit(10)
  end
end
