class ChangeColName < ActiveRecord::Migration
  def change
  	rename_column :species_entries, :species_id, :forest_type_id
  	rename_column :species_entries, :data_id, :field_data_id
  end
end
