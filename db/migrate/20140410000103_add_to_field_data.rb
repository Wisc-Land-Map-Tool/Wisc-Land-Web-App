class AddToFieldData < ActiveRecord::Migration
  def change
  	add_column :field_data, :mature_height, :boolean
  end
end
