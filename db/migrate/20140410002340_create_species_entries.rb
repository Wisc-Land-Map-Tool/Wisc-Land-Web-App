class CreateSpeciesEntries < ActiveRecord::Migration
  def change
    create_table :species_entries do |t|
      t.integer :data_id
      t.integer :species_id
      t.integer :percentage

      t.timestamps
    end
  end
end
