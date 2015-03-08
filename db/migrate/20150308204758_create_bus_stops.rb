class CreateBusStops < ActiveRecord::Migration
  def change
    create_table :bus_stops do |t|
      t.string :on_street
      t.string :cross_street
      t.float :boardings
      t.float :alightings
      t.date :month_beginning
      t.string :day_type
      t.decimal :latitude, precision: 11, scale: 8
      t.decimal :longitude, precision: 11, scale: 8

      t.timestamps
    end
    add_index :bus_stops, :boardings
  end
end
