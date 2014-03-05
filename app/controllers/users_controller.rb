class UsersController < ApplicationController

def destroy
	User.find(params[:id]).destroy
    flash[:success] = "User deleted."
    redirect_to roles_path
end

end
