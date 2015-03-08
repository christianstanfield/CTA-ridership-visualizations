class BusStopsController < ApplicationController
  def index
    @bus_stops = BusStop.order_by_routes
  end
end
