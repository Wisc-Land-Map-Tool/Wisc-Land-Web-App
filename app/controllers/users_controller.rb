class UsersController < ApplicationController

respond_to :html,:xml,:json

def destroy
	User.find(params[:id]).destroy
    flash[:success] = "User deleted."
    redirect_to roles_path
end

def index
    respond_with(@users = User.all)
end

end
