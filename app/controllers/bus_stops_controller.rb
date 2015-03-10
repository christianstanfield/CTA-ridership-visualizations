class BusStopsController < ApplicationController

  def index
    @bus_stops = BusStop.order_by_routes
  end

  def chart
    gon.bus_stops = BusStop.order('boardings desc').limit(100)
  end
end
