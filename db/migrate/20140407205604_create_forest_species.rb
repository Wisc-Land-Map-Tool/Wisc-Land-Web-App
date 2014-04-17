class CreateForestSpecies < ActiveRecord::Migration
  def change
    create_table :forest_species do |t|
      t.integer :speciesId
      t.string :speciesName
    end
  end
end
