class AssignmentsController < ApplicationController
	def index
		@assignments = Assignment.all
	end

	def assignTasks
		assigner=params[:assigner]
		assignee=params[:assignee]
		locationIds=params[:locationIds]
		locationIds.each do |id|
			Assignment.create(UserIdAssigner: assigner,user_id: assignee,location_id: id,Status: 1)
		end

		render :json => {success: 'true', redirect: 'http://localhost:3000/' }
	end
end