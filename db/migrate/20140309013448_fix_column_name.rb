class FixColumnName < ActiveRecord::Migration
  def change
  	rename_column :assignments, :UserIdAssigned, :user_id
  end
end
