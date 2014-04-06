class Newassignments < ActiveRecord::Migration
  def change
    create_table :assignments do |t|
      t.integer :UserIdAssigner
      t.integer :user_id
      t.integer :location_id
      t.integer :Status
      t.decimal :lat
      t.decimal :long
      t.timestamp :CompletionTime
      t.timestamps
    end
  end
end

