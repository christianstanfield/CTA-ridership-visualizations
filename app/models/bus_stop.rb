class BusStop < ActiveRecord::Base
  has_many :bus_stop_routes
  has_many :routes, through: :bus_stop_routes

  validates :on_street, presence: true
  validates :cross_street, presence: true
  validates :boardings, presence: true, numericality: true
  validates :alightings, presence: true, numericality: true
  validates :month_beginning, presence: true, format: { with: /\d{4}-\d{2}-\d{2}/ }
  validates :day_type, presence: true
  validates :latitude, presence: true, numericality: true
  validates :longitude, presence: true, numericality: true

end
