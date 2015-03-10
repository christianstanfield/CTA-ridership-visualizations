class BusStopsController < ApplicationController
  layout :choose_layout

  def index
    @bus_stops = BusStop.order_by_routes
  end

  def map # may become chart instead
    gon.bus_stops = BusStop.limit(100)
  end

  private

  def choose_layout
    if action_name == 'map'
      'map'
    else
      'application'
    end
  end
end
