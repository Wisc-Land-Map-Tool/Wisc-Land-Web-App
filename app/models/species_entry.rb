class SpeciesEntry < ActiveRecord::Base
	belongs_to :forest_type
	belongs_to :field_data
end
