class AddIdToForests < ActiveRecord::Migration
  
  def change
    create_table :forest_types do |t|
    	t.string   "species_name"
    	t.datetime "created_at"
    	t.datetime "updated_at"
    	t.integer  "forest_id"
    end
  
   	add_column :vegetations, :vegetation_id, :integer
  end
end
