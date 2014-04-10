class FieldDatasController < ApplicationController
	def submit
		@fdata=FieldData.create( covertype1_id: params[:coverType1],  covertype2_id: params[:coverType2], covertype3_id: params[:coverType3], confidence_level: params[:confidenceLevel], canopy_perc: params[:canopyCov], cover_comment: params[:forestSpeciesComments], canopy_comment: params[:canopyComments],  general_comment: params[:additionalComments], identification_method: params[:methodOfID], assignment_id:  1 ,mature_height: params[:treesAreMatureHeight])
		dataid=@fdata.id

		logger.debug @fdata[:user_id]

		@vegetation=params[:Vegetation]
		if @vegetation
			@vegetation.each do | veg| 
				VegetationEntry.create(data_id: dataid,vegetation_id: veg)
			end
		end

		@species=params[:species]
		if @species
			@species.each do | spec| 
				SpeciesEntry.create(field_data_id: dataid,forest_type_id: spec[:forest_type_id],percentage: spec[:percentage])
			end
		end

		render :json => {success: 'true' }
	end
end
