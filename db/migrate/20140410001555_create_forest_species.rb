class CreateForestSpecies < ActiveRecord::Migration
  def change
    create_table :forest_species do |t|
      t.string :species_name

      t.timestamps
    end
  end
end
