class BusStopsController < ApplicationController
  layout :choose_layout

  def index
    @bus_stops = BusStop.order_by_routes
  end

  def map
    gon.bus_stops = BusStop.limit(100)
  end
end
