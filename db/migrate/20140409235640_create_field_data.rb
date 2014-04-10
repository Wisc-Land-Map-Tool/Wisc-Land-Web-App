class CreateFieldData < ActiveRecord::Migration
  def change
    create_table :field_data do |t|
      t.integer :covertype1_id
      t.integer :covertype2_id
      t.integer :covertype3_id
      t.integer :confidence_level
      t.integer :canopy_perc
      t.text :cover_comment
      t.text :canopy_comment
      t.text :general_comment
      t.integer :identification_method
      t.integer :assignment_id

      t.timestamps
    end
  end
end
