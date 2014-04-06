class DashboardController < ApplicationController
before_filter :authenticate_user!
respond_to :html,:xml,:json
 
def index
	@users = User.all
	@users.each do | user| 
		class << user
  			attr_accessor :count
		end
		user.count =  Assignment.where(:user_id => user.id, :Status => 1).count
	end
end

def roles
	@users = User.all
end

def roleCheck
	@user = User.find(params[:id])
	@userRoles = @user.roles
	render :json => @userRoles.to_json
end

def addRole
	@user = User.find(params[:id])
	@roleStates = params[:roles]

	if (@roleStates[0] == "true")
		@user.add_role :admin
	else
		@user.remove_role :admin
	end

	if (@roleStates[1] == "true")
		@user.add_role :field_manager
	else
		@user.remove_role :field_manager
	end

	if(@roleStates[2] == "true")
		@user.add_role :field_staff
	else
		@user.remove_role :field_staff
	end

	render :json => {success: 'true'}
end

def removeRole

end

def tasks
end

def classifications
end

end
