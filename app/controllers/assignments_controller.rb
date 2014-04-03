class AssignmentsController < ApplicationController
	respond_to :html,:xml,:json

	def index
		@assignments = Assignment.all
		render :json => @assignments.to_json
	end

	def assignTasks
		assigner=params[:assigner]
		assignee=params[:assignee]
		locationIds=params[:locationIds]
		locationIds.each do |id|
			ass= Assignment.find_or_initialize_by(location_id: id)
			ass.update(UserIdAssigner: assigner,user_id: assignee,location_id: id,Status: 1)
		end
		render :json => {success: 'true', redirect: 'http://localhost:3000/' }
	end
end