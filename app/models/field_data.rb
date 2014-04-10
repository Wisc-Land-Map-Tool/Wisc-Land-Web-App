class FieldData < ActiveRecord::Base
	belongs_to :assignment
	has_many :species_entries
end
