require 'spec_helper'

describe AssignmentsController do

	describe "assign tasks" do

		it "should correctly assign tasks" do
			@json = { :assigner => 1, :assignee => 2, :locations => [{:id => 1, :long => 23, :lat => 84}]}
			post :assignTasks, @json
			JSON.parse(response.body)["success"] == true
		end

	end



end
