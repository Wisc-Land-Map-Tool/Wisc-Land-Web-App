class CreateClassifications < ActiveRecord::Migration
  def change
    create_table :classifications do |t|
      t.integer :class_id
      t.string :class_name
      t.integer :level
      t.integer :parent

      t.timestamps
    end
  end
end
