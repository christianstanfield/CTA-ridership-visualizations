class CreateBusStopRoutes < ActiveRecord::Migration
  def change
    create_table :bus_stop_routes do |t|
      t.references :bus_stop, index: true
      t.references :route, index: true

      t.timestamps
    end
  end
end
