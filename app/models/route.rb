class Route < ActiveRecord::Base
  has_many :bus_stop_routes
  has_many :bus_stops, through: :bus_stop_routes

  validates :number, presence: true

  scope :order_by_bus_stops, ->{ joins(:bus_stop_routes).group('routes.id').order('count(bus_stop_routes.route_id) desc') }

end
