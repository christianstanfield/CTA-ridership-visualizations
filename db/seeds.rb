# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

require 'csv'
require 'date'
file = 'db/CTA_-_Ridership_-_Avg._Weekday_Bus_Stop_Boardings_in_October_2012.csv'

CSV.foreach(file, headers: true, header_converters: :symbol) do |row|

  lat_long = row[:location].split(',').map do |location|
    location.gsub(/[\s)(]/,'').to_f # regex removing whitespace and parens
  end

  bus_stop = BusStop.create!(on_street: row[:on_street], cross_street: row[:cross_street], boardings: row[:boardings], alightings: row[:alightings], month_beginning: Date.strptime(row[:month_beginning], '%m/%d/%Y'), day_type: row[:daytype], latitude: lat_long[0], longitude: lat_long[1])

  unless row[:routes].nil? # stop_ids: 9267 & 12548 list no routes
    row[:routes].split(',').each do |route_number|
      unless route_number == '' # some bus_stops have empty route listings in their list of routes
        route_number.gsub!(' ','')
        route = Route.where(number: route_number).first_or_create!
        BusStopRoute.create!(bus_stop_id: bus_stop.id, route_id: route.id)
      end
    end
  end
end
