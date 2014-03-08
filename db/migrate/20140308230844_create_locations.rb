class CreateLocations < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.decimal :Long
      t.decimal :Lat

      t.timestamps
    end
  end
end
