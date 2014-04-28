class AddIdToForests < ActiveRecord::Migration
  def change
  	  	add_column :forest_types, :forest_id, :integer
   	  	add_column :vegetations, :vegetation_id, :integer
  end
end
