class AddPolygon < ActiveRecord::Migration
  def change
  	remove_column :assignments, :lat
  	remove_column :assignments, :long
  	add_column :assignments, :polygon, :string
  end
end
