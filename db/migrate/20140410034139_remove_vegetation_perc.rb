class RemoveVegetationPerc < ActiveRecord::Migration
  def change
	remove_column :vegetation_entries, :percentage
  end
end
