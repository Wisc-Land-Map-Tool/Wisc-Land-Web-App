class UsersController < ApplicationController
respond_to :html,:xml,:json

def destroy
	User.find(params[:id]).destroy
    flash[:success] = "User deleted."
    redirect_to roles_path
end

def index
    render :json => (@users = User.all)
end

def assignments
	@user = User.find(params[:id])

	@assignments = @user.assignments
	render :json => @assignments.to_json
end

end
