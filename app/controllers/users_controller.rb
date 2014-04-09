class UsersController < ApplicationController
respond_to :html,:xml,:json

def destroy
	User.find(params[:id]).destroy
    flash[:success] = "User deleted."
    redirect_to roles_path
end

def index
    render :json => (@users = User.all)
    if params[:approved] == "false"
      @users = User.find_all_by_approved(false)
    else
      @users = User.all
    end
end

def approve
  @user = User.find(params[:id])
  @user.approved = true
  @user.save
  render :json => @user
end

def assignments
	@user = User.find(params[:id])

	@assignments = @user.assignments
	render :json => @assignments.to_json
end

end
