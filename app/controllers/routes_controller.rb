class RoutesController < ApplicationController
  layout :choose_layout

  def index
    @routes = Route.order_by_bus_stops
  end

  def show
    @route = Route.find(params[:id])

    gon.route = @route
    gon.bus_stops = @route.bus_stops
  end

  private

  def choose_layout
    if action_name == 'show'
      'map'
    else
      'application'
    end
  end
end
