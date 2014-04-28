class FieldDatasController < ApplicationController
	def submit
		@fdata=FieldData.create( covertype1_id: params[:coverType1],  covertype2_id: params[:coverType2], covertype3_id: params[:coverType3], confidence_level: params[:confidenceLevel], canopy_perc: params[:canopyCov], cover_comment: params[:forestSpeciesComments], canopy_comment: params[:canopyComments],  general_comment: params[:additionalComments], identification_method: params[:methodOfID], assignment_id:  params[:assignment_id], mature_height: params[:treesAreMatureHeight])
		dataid=@fdata.id

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

		ass= Assignment.find_or_initialize_by(id: params[:assignment_id])
		ass.update(Status: 2)
		

		render :json => {success: 'true' }
	end

	def getFieldDataDetails
		fdata=FieldData.where(assignment_id: params[:assignment_id] ).first
		species=SpeciesEntry.where(field_data_id: fdata.id)
		vegetation=VegetationEntry.where(data_id: fdata.id)
		render :json => {field_data: fdata,species: species,vegetation: vegetation}
	end
end
