require 'spec_helper'

describe FieldDatasController do

	describe "Post data" do

		it "if sent data from mobile, inserts into database" do

			@json = { :data => { :coverType1 => 1, :coverType2 => 1, :coverType3 => 1, 
			:confidenceLevel => 1, :canopyCov => 20, :forestSpeciesComments => "test forest comment", :canopyComments => "test canopy comment",
			:additionalComments => "test additionalComments", :methodOfID => 1, :treesAreMatureHeight => 1,
			:Vegetation => {:data_id =>1, :vegetation_id =>1}, :species => {:field_data_id => 1, 
			:forest_type_id => 1, :percentage => 20}} }


          	post :submit, @json
          	JSON.parse(response.body)["success"] == true

		end

	end

end
