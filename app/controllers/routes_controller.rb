class RoutesController < ApplicationController
  def index
    @routes = Route.order_by_bus_stops
  end
end
