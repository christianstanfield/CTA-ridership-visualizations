class Route < ActiveRecord::Base
  has_many :bus_stop_routes
  has_many :bus_stops, through: :bus_stop_routes

  validates :number, presence: true

end
