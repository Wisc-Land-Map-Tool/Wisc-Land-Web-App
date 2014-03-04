class DashboardController < ApplicationController
before_filter :authenticate_user!
 
def index    
end

def roles
	@users = User.all
end

def tasks
end

def classifications
end

end
