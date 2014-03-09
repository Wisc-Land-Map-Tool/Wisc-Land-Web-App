class FixLocationColumnName < ActiveRecord::Migration
  def change
  	rename_column :assignments, :LocationId, :location_id
  end
end
