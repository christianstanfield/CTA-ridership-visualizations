class BusStopRoute < ActiveRecord::Base
  belongs_to :bus_stop
  belongs_to :route
end
