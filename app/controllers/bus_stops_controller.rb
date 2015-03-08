class BusStopsController < ApplicationController
  def index
    @bus_stops = BusStop.all
  end
end
