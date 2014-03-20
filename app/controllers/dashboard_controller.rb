class DashboardController < ApplicationController
before_filter :authenticate_user!
 
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

def tasks
end

def classifications
end

end
