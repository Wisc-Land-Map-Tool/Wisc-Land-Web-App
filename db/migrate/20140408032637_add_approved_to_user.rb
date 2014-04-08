class AddApprovedToUser < ActiveRecord::Migration
  def change
    add_column :users, :approved, :boolean, :default => false, :null => false
    add_index  :users, :approved

    remove_column :users, :confirmation_token
    remove_column :users, :confirmed_at
    remove_column :users, :confirmation_sent_at
    remove_column :users, :unconfirmed_email
  end
end
