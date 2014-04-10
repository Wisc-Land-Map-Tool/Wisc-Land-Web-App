class CreateVegetationEntries < ActiveRecord::Migration
  def change
    create_table :vegetation_entries do |t|
      t.integer :vegetation_id
      t.integer :data_id
      t.integer :percentage

      t.timestamps
    end
  end
end
