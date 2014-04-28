class AssignmentsController < ApplicationController
	respond_to :html,:xml,:json

	def index
		@assignments = Assignment.all
		render :json => @assignments.to_json
	end

	def assignTasks
		assigner=params[:assigner]
		assignee=params[:assignee]
		locations=params[:locations]
		logger.debug locations
		locations.each do |loc|
			logger.debug loc
			ass= Assignment.find_or_initialize_by(location_id: loc[:id])
			ass.update(UserIdAssigner: assigner,user_id: assignee,location_id: loc[:id],Status: 1, polygon: loc[:polygon])
		end
		render :json => {success: 'true', redirect: 'http://localhost:3000/' }
	end

	def getTasks
		@assignments = Assignment.where(:user_id => params[:id],:Status => 1)
		render :json => @assignments.to_json
	end
end