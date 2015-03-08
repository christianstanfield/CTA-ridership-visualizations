class CreateRoutes < ActiveRecord::Migration
  def change
    create_table :routes do |t|
      t.string :number

      t.timestamps
    end
    add_index :routes, :number
  end
end
