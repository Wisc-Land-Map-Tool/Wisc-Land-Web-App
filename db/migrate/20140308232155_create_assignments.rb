class CreateAssignments < ActiveRecord::Migration
  def change
    create_table :assignments do |t|
      t.integer :UserIdAssigner
      t.integer :UserIdAssigned
      t.integer :LocationId
      t.integer :Status
      t.timestamp :CompletionTime

      t.timestamps
    end
  end
end
