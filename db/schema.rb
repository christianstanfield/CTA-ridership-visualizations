# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150308205352) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "bus_stop_routes", force: true do |t|
    t.integer  "bus_stop_id"
    t.integer  "route_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "bus_stop_routes", ["bus_stop_id"], name: "index_bus_stop_routes_on_bus_stop_id", using: :btree
  add_index "bus_stop_routes", ["route_id"], name: "index_bus_stop_routes_on_route_id", using: :btree

  create_table "bus_stops", force: true do |t|
    t.string   "on_street"
    t.string   "cross_street"
    t.float    "boardings"
    t.float    "alightings"
    t.date     "month_beginning"
    t.string   "day_type"
    t.decimal  "latitude",        precision: 11, scale: 8
    t.decimal  "longitude",       precision: 11, scale: 8
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "bus_stops", ["boardings"], name: "index_bus_stops_on_boardings", using: :btree

  create_table "routes", force: true do |t|
    t.string   "number"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "routes", ["number"], name: "index_routes_on_number", using: :btree

end
